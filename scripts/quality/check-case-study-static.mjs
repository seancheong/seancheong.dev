import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

import {
  getPublishedWorkParams,
  publishedLocales,
} from '../../src/portfolio-content/index.ts';

const assets = JSON.parse(
  await readFile('.next/app-build-manifest.json', 'utf8'),
);
const cssFiles = [
  ...new Set(
    [
      ...assets.pages['/[locale]/layout'],
      ...assets.pages['/[locale]/work/[slug]/page'],
    ].filter((file) => file.endsWith('.css')),
  ),
];

assert(
  cssFiles.length > 0,
  'Build manifest must identify the case-study stylesheets',
);

const manifest = JSON.parse(
  await readFile('.next/prerender-manifest.json', 'utf8'),
);
for (const { locale, slug } of getPublishedWorkParams()) {
  const route = `/${locale}/work/${slug}`;
  assert.equal(
    manifest.routes[route]?.initialRevalidateSeconds,
    3600,
    `${route} must have real hourly-revalidated static output`,
  );
  const htmlPath = `.next/server/app${route}.html`;
  await access(htmlPath);
  const html = await readFile(htmlPath, 'utf8');
  assert(
    !/<link\b[^>]*rel=["']stylesheet["']/.test(html),
    `${route} must not add a blocking stylesheet request`,
  );
  for (const css of cssFiles)
    assert(
      html.includes(await readFile(`.next/${css}`, 'utf8')),
      `${route} must inline complete generated CSS: ${css}`,
    );
  assert(
    !html.includes('app/%5Blocale%5D/page-'),
    `${route} must not load the Home route's JavaScript`,
  );
}
console.log(
  'Approved case-study routes have static HTML and hourly revalidation.',
);

for (const locale of publishedLocales) {
  const route = `/${locale}`;
  assert.equal(
    manifest.routes[route]?.initialRevalidateSeconds,
    3600,
    `${route} must have real hourly-revalidated Home output`,
  );
  const html = await readFile(`.next/server/app${route}.html`, 'utf8');
  assert(
    html.includes('Senior Consultant') && html.includes('Guidewire'),
    `${route} must expose current career facts in server HTML`,
  );
  assert(
    html.includes('Read the case study') &&
      html.includes(`/${locale}/work/takonbini`),
    `${route} must expose its primary evidence path in server HTML`,
  );
  assert(
    !/<form\b/.test(html),
    `${route} must not revive the legacy message form`,
  );
}
console.log(
  'Published Home routes have static career content and the case-study path.',
);
