import path from 'node:path';

const contentRoot = path.resolve('src/portfolio-content');
const srcRoot = path.resolve('src');
const inside = (file, directory) =>
  file === directory || file.startsWith(`${directory}${path.sep}`);
const publicEntries = new Set(['index', 'server', 'locales']);

const contentBoundaries = {
  rules: {
    imports: {
      meta: {
        type: 'problem',
        schema: [],
        messages: {
          rendering:
            'Portfolio Content must not import rendering, routes, journeys or UI.',
          interface:
            'Read Portfolio Content through its index, server or locale interface.',
          fixture: 'Production modules must not depend on test fixtures.',
        },
      },
      create(context) {
        const filename = context.filename;
        return {
          ImportDeclaration(node) {
            inspect(node.source);
          },
          ExportNamedDeclaration(node) {
            if (node.source) inspect(node.source);
          },
          ExportAllDeclaration(node) {
            inspect(node.source);
          },
          ImportExpression(node) {
            inspect(node.source);
          },
        };
        function inspect(node) {
          const value = node.value;
          if (typeof value !== 'string') return;
          if (
            inside(filename, contentRoot) &&
            /^(react|react-dom)(\/|$)/.test(value)
          ) {
            context.report({ node, messageId: 'rendering' });
            return;
          }
          const target = value.startsWith('@/')
            ? path.resolve(srcRoot, value.slice(2))
            : value.startsWith('.')
              ? path.resolve(path.dirname(filename), value)
              : undefined;
          if (!target) return;
          if (inside(target, path.resolve('tests')))
            context.report({ node, messageId: 'fixture' });
          if (
            inside(filename, contentRoot) &&
            inside(target, srcRoot) &&
            !inside(target, contentRoot)
          )
            context.report({ node, messageId: 'rendering' });
          if (!inside(filename, contentRoot) && inside(target, contentRoot)) {
            const entry = path
              .relative(contentRoot, target)
              .replace(/\.(ts|tsx|js|mjs)$/, '');
            if (target !== contentRoot && !publicEntries.has(entry))
              context.report({ node, messageId: 'interface' });
          }
        }
      },
    },
  },
};

export default contentBoundaries;
