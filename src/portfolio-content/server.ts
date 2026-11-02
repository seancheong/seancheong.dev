import { compile } from '@mdx-js/mdx';
import type { Root } from 'mdast';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import 'server-only';

import { takonbiniMedia } from './case-study-media';
import {
  type ContentConfiguration,
  type ContentIssue,
  createPortfolioContent,
} from './model';
import { configuration } from './registry';

export type { CaseStudyMedia } from './case-study-media';

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
    const headings: { title: string; start: number; end: number }[] = [];
    function collectSections() {
      return (tree: Root) => {
        for (const node of tree.children) {
          if (node.type !== 'heading' || node.depth !== 2) continue;
          const start = node.position?.start.offset;
          const end = node.position?.end.offset;
          if (start === undefined || end === undefined) continue;
          const title = node.children
            .map((child) => ('value' in child ? child.value : ''))
            .join('');
          headings.push({ title, start, end });
        }
      };
    }
    const compiled = await compile(
      { path: id, value: source },
      { outputFormat: 'function-body', remarkPlugins: [collectSections] },
    );
    const sections = await Promise.all(
      headings.map(async (heading, index) => ({
        id: heading.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/-$/, ''),
        title: heading.title,
        compiledSource: String(
          await compile(source.slice(heading.end, headings[index + 1]?.start), {
            outputFormat: 'function-body',
          }),
        ),
      })),
    );
    const media: Partial<typeof takonbiniMedia> =
      id === 'takonbini/en' ? takonbiniMedia : {};
    return {
      media,
      format: 'mdx' as const,
      source,
      compiledSource: String(compiled),
      sections,
    };
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
