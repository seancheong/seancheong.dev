import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';

import {
  evaluate,
  lcpMediaBytes,
  median,
} from '../../scripts/quality/metrics.mjs';

const budgets = JSON.parse(
  readFileSync('scripts/quality/budgets.json', 'utf8'),
);
const sample = {
  performance: 95,
  accessibility: 100,
  'best-practices': 100,
  seo: 100,
  lcpMs: 2500,
  cls: 0.1,
  tbtMs: 200,
  firstLoadJsBytes: 180000,
  lcpMediaBytes: 250000,
};

test('takes the median without dropping a slow measurement', () => {
  expect(median([6000, 1800, 2200])).toBe(2200);
});

test('incomplete or invalid measurements cannot pass', () => {
  expect(() => median([100, 200])).toThrow();
  expect(() => median([100, NaN, 200])).toThrow();
});

describe.each(['mobile', 'desktop'])('%s release budgets', (profile) => {
  test('accepts the exact approved thresholds', () => {
    expect(
      evaluate([sample, sample, sample], profile, budgets).failures,
    ).toEqual([]);
  });
  test.each(['lcpMs', 'cls', 'tbtMs', 'firstLoadJsBytes', 'lcpMediaBytes'])(
    'rejects excess %s',
    (key) => {
      const failing = { ...sample, [key]: sample[key] + 1 };
      expect(
        evaluate([failing, failing, failing], profile, budgets).failures,
      ).toHaveLength(1);
    },
  );
  test.each(['performance', 'accessibility', 'best-practices', 'seo'])(
    'rejects insufficient %s',
    (key) => {
      const failing = { ...sample, [key]: budgets[profile][key] - 1 };
      expect(
        evaluate([failing, failing, failing], profile, budgets).failures,
      ).toHaveLength(1);
    },
  );
});

test('a missing metric cannot silently pass', () => {
  const incomplete = { ...sample };
  delete incomplete.cls;
  expect(() =>
    evaluate([incomplete, incomplete, incomplete], 'mobile', budgets),
  ).toThrow();
});

test('more than 10 kB JavaScript growth requires review even below the hard limit', () => {
  const result = evaluate(
    [sample, sample, sample],
    'mobile',
    budgets,
    sample.firstLoadJsBytes - 10001,
  );
  expect(result.failures).toContain(
    'JavaScript increase requires documented review: 10001 bytes',
  );
});

test('LCP media uses the browser-selected srcset resource rather than fallback src', () => {
  const node = { path: 'image-path', snippet: '<img src="fallback.jpg">' };
  const images = [
    { node: { devtoolsNodePath: 'image-path' }, src: 'selected.jpg' },
  ];
  const requests = [{ url: 'selected.jpg', transferSize: 250001 }];
  expect(lcpMediaBytes(node, images, requests)).toBe(250001);
});

test('unresolved image or cached transfer cannot silently pass a media budget', () => {
  const node = { path: 'image-path', snippet: '<img src="fallback.jpg">' };
  expect(() => lcpMediaBytes(node, [], [])).toThrow();
  const images = [
    { node: { devtoolsNodePath: 'image-path' }, src: 'selected.jpg' },
  ];
  expect(() =>
    lcpMediaBytes(node, images, [{ url: 'selected.jpg', transferSize: 0 }]),
  ).toThrow();
});

test('text LCP does not invent a media transfer', () => {
  expect(
    lcpMediaBytes({ path: 'heading', snippet: '<h1>Title</h1>' }, [], []),
  ).toBe(0);
});
