import { compile } from '@mdx-js/mdx';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import 'server-only';

import {
  type ContentConfiguration,
  type ContentIssue,
  createPortfolioContent,
} from './model';
import { configuration } from './registry';

type Sources = Readonly<Record<string, () => Promise<string>>>;
const sources = {
  'takonbini/en': () =>
    readFile(
      path.join(process.cwd(), 'content/case-studies/takonbini/en.mdx'),
      'utf8',
    ),
} satisfies Sources;

export function createCaseStudyContent(
  config: ContentConfiguration,
  sources: Sources,
) {
  const content = createPortfolioContent(config);

  async function read(id: string) {
    const load = Object.hasOwn(sources, id) ? sources[id] : undefined;
    if (!load) throw new Error(`Missing explicit case-study loader: ${id}`);
    const source = await load();
    if (!source.trim()) throw new Error(`Empty MDX document: ${id}`);
    const compiled = await compile(
      { path: id, value: source },
      { outputFormat: 'function-body' },
    );
    return { format: 'mdx' as const, source, compiledSource: String(compiled) };
  }

  return {
    async getCaseStudy(locale: string, slug: string) {
      const result = content.getCaseStudy(locale, slug);
      if (result.status !== 'found') return result;
      try {
        return {
          status: 'found' as const,
          value: { ...result.value, ...(await read(result.value.id)) },
        };
      } catch (error) {
        return {
          status: 'invalid' as const,
          issues: [
            {
              path: result.value.id,
              message:
                error instanceof Error ? error.message : 'MDX loading failed',
            },
          ],
        };
      }
    },
    async validateContent(mode: 'current' | 'release' = 'current') {
      const issues: ContentIssue[] = content.validate(mode);
      const ids = new Set(config.documents.map((document) => document.id));
      for (const id of Object.keys(sources))
        if (!ids.has(id))
          issues.push({
            path: id,
            message: 'Loader has no registered document',
          });
      for (const document of config.documents) {
        try {
          await read(document.id);
        } catch (error) {
          issues.push({
            path: document.id,
            message:
              error instanceof Error ? error.message : 'MDX validation failed',
          });
        }
      }
      return issues;
    },
  };
}

export const { getCaseStudy, validateContent } = createCaseStudyContent(
  configuration,
  sources,
);
