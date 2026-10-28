import { mkdir, readFile, writeFile } from 'node:fs/promises';

import { evaluate } from './metrics.mjs';

const path = process.argv[2] ?? 'artifacts/lighthouse/summary.json';
const report = JSON.parse(await readFile(path, 'utf8'));
if (process.env.HARNESS_FAILURE === 'lighthouse') {
  for (const item of report.summary) {
    item.samples = item.samples.map((sample) => ({
      ...sample,
      lcpMs: report.budgets.lcpMs + 1,
    }));
    Object.assign(item, evaluate(item.samples, item.profile, report.budgets));
  }
  await mkdir('artifacts/probes/lighthouse', { recursive: true });
  await writeFile(
    'artifacts/probes/lighthouse/summary.json',
    JSON.stringify(report, null, 2),
  );
}
if (report.summary.some((item) => item.failures.length)) {
  console.error(
    JSON.stringify(
      report.summary.map(({ route, profile, failures }) => ({
        route,
        profile,
        failures,
      })),
      null,
      2,
    ),
  );
  process.exitCode = 1;
}
