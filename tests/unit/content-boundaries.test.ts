// @vitest-environment node
import { ESLint } from 'eslint';
import { expect, test } from 'vitest';

const lint = new ESLint({
  overrideConfigFile: 'eslint.dependencies.mjs',
  overrideConfig: { linterOptions: { noInlineConfig: true } },
});

test.each([
  [
    'src/portfolio-content/probe.ts',
    "import Page from '../app/[locale]/page';",
  ],
  [
    'src/portfolio-content/probe.ts',
    "const render = import('react/jsx-runtime');",
  ],
  [
    'src/app/probe.ts',
    "import { configuration } from '../portfolio-content/registry';",
  ],
  [
    'src/app/probe.ts',
    "import { configuration } from '@/portfolio-content/registry';",
  ],
  [
    'src/portfolio-content/probe.ts',
    "import fixture from '../../tests/fixtures/content';",
  ],
])('rejects forbidden dependency from %s', async (filePath, source) => {
  const [result] = await lint.lintText(source, { filePath });
  expect(result.messages).toContainEqual(
    expect.objectContaining({ ruleId: 'portfolio-content/imports' }),
  );
});

test.each([
  ['src/app/probe.ts', "import { getProject } from '@/portfolio-content';"],
  [
    'src/app/probe.ts',
    "import { getCaseStudy } from '@/portfolio-content/server';",
  ],
  [
    'src/portfolio-content/probe.ts',
    "import type { ContentConfiguration } from './model';",
  ],
])(
  'allows the public interface and module internals from %s',
  async (filePath, source) => {
    const [result] = await lint.lintText(source, { filePath });
    expect(result.messages).not.toContainEqual(
      expect.objectContaining({ ruleId: 'portfolio-content/imports' }),
    );
  },
);
