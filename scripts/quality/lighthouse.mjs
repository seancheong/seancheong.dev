import { chromium } from '@playwright/test';
import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

import { evaluate, lcpMediaBytes } from './metrics.mjs';

const budgets = JSON.parse(
  await readFile(new URL('./budgets.json', import.meta.url), 'utf8'),
);
const routes = JSON.parse(
  await readFile(new URL('./routes.json', import.meta.url), 'utf8'),
);
const output = 'artifacts/lighthouse';
await mkdir(output, { recursive: true });
const server = spawn(
  process.execPath,
  [
    'node_modules/next/dist/bin/next',
    'start',
    '--hostname',
    'localhost',
    '--port',
    '3200',
  ],
  { stdio: ['ignore', 'pipe', 'pipe'] },
);
let serverLog = '';
for (const stream of [server.stdout, server.stderr])
  stream.on('data', (chunk) => {
    serverLog += chunk;
  });
const base = 'http://localhost:3200';
const baseline = process.env.QUALITY_BASELINE_REPORT
  ? JSON.parse(await readFile(process.env.QUALITY_BASELINE_REPORT, 'utf8'))
  : undefined;
const summary = [];
let chrome;
try {
  const deadline = Date.now() + 60_000;
  while (true) {
    if (server.exitCode !== null)
      throw new Error(`Production server exited: ${serverLog}`);
    try {
      if ((await fetch(`${base}/en`)).ok) break;
    } catch (error) {
      if (!(error instanceof TypeError)) throw error;
    }
    if (Date.now() > deadline)
      throw new Error('Production server readiness timeout');
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  chrome = await launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'],
  });
  for (const route of routes) {
    for (const profile of ['mobile', 'desktop']) {
      const samples = [];
      for (let run = 1; run <= budgets.runs; run++) {
        const result = await lighthouse(
          `${base}${route.path}`,
          { port: chrome.port, output: ['json', 'html'], logLevel: 'error' },
          profile === 'desktop' ? desktopConfig : undefined,
        );
        if (!result || result.lhr.runtimeError)
          throw new Error(
            `Lighthouse failed: ${result?.lhr.runtimeError?.message}`,
          );
        const prefix = `${output}/${route.name}-${profile}-${run}`;
        await writeFile(`${prefix}.json`, result.report[0]);
        await writeFile(`${prefix}.html`, result.report[1]);
        const { audits, categories } = result.lhr;
        const requests = audits['network-requests'].details.items;
        const node = audits['lcp-breakdown-insight']?.details?.items?.find(
          (item) => item.type === 'node',
        );
        if (!node)
          throw new Error('Lighthouse did not identify an LCP element');
        const sample = {
          ...Object.fromEntries(
            Object.entries(categories).map(([key, value]) => [
              key,
              value.score * 100,
            ]),
          ),
          lcpMs: audits['largest-contentful-paint'].numericValue,
          cls: audits['cumulative-layout-shift'].numericValue,
          tbtMs: audits['total-blocking-time'].numericValue,
          firstLoadJsBytes: requests
            .filter((request) => request.resourceType === 'Script')
            .reduce((total, request) => total + request.transferSize, 0),
          lcpMediaBytes: lcpMediaBytes(
            node,
            result.artifacts.ImageElements,
            requests,
          ),
        };
        samples.push(sample);
        console.log(
          `${route.name} ${profile} ${run}/3: LCP ${Math.round(sample.lcpMs)}ms`,
        );
      }
      const previous = baseline?.summary.find(
        (entry) => entry.route.path === route.path && entry.profile === profile,
      );
      const evaluation = evaluate(
        samples,
        profile,
        budgets,
        previous?.metrics.firstLoadJsBytes,
      );
      summary.push({
        route,
        profile,
        samples,
        homeTargetMet:
          route.name === 'home'
            ? evaluation.metrics.firstLoadJsBytes <= budgets.homeTargetJsBytes
            : undefined,
        javascriptGrowthReview: previous
          ? 'Compared against supplied baseline report; resolve any review failure with documented evidence.'
          : 'No matched baseline supplied; compare a reviewed report before release.',
        ...evaluation,
      });
    }
  }
  await writeFile(
    `${output}/summary.json`,
    JSON.stringify({ budgets, summary }, null, 2),
  );
  console.log(
    JSON.stringify(
      summary.map(({ route, profile, failures }) => ({
        path: route.path,
        profile,
        failures,
      })),
      null,
      2,
    ),
  );
  if (
    process.argv.includes('--enforce') &&
    summary.some((entry) => entry.failures.length)
  )
    process.exitCode = 1;
} finally {
  await writeFile(`${output}/server.log`, serverLog);
  server.kill('SIGTERM');
  await chrome?.kill();
}
