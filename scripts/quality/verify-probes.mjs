import { spawnSync } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';

const probes = {
  unit: ['test:unit'],
  browser: [
    'exec',
    'playwright',
    'test',
    'home.spec.ts',
    '--project',
    'chromium',
    '--grep',
    'home navigation reaches',
  ],
  axe: ['test:axe'],
  lighthouse: ['exec', 'node', 'scripts/quality/check-report.mjs'],
};
const selected = process.argv.slice(2);
if (!selected.length || selected.some((name) => !Object.hasOwn(probes, name)))
  throw new Error('Select unit, browser, axe or lighthouse probes');
for (const name of selected) {
  const folder = `artifacts/probes/${name}`;
  await mkdir(folder, { recursive: true });
  const result = spawnSync('pnpm', probes[name], {
    env: { ...process.env, HARNESS_FAILURE: name },
    encoding: 'utf8',
    timeout: 120_000,
  });
  await writeFile(
    `${folder}/command.log`,
    `${result.stdout ?? ''}\n${result.stderr ?? ''}`,
  );
  if (result.error || result.status !== 1)
    throw new Error(
      `${name} did not produce the expected assertion/budget failure: ${result.error ?? result.status}`,
    );
  if (
    name === 'unit' &&
    !(await readFile(`${folder}/results.xml`, 'utf8')).includes('<failure')
  )
    throw new Error('Unit failure report missing');
  if (name === 'browser' || name === 'axe') {
    const files = await readdir(folder, { recursive: true });
    if (
      !files.some((file) => file.endsWith('trace.zip')) ||
      !files.some((file) => file.endsWith('.png'))
    )
      throw new Error(`${name} trace or screenshot missing`);
    if (name === 'axe') {
      const reports = files.filter(
        (file) => file.includes('axe-results') && file.endsWith('.json'),
      );
      if (!reports.length) throw new Error('Axe JSON attachment missing');
      const report = JSON.parse(
        await readFile(`${folder}/${reports[0]}`, 'utf8'),
      );
      if (!report.violations.some((item) => item.id === 'image-alt'))
        throw new Error('Injected axe violation missing');
    }
  }
  if (name === 'lighthouse') {
    const report = JSON.parse(await readFile(`${folder}/summary.json`, 'utf8'));
    if (
      !report.summary.every((item) =>
        item.failures.some((failure) => failure.startsWith('lcpMs:')),
      )
    )
      throw new Error('LCP budget failure missing');
  }
  console.log(`${name}: expected failure and diagnostic artifacts verified`);
}
