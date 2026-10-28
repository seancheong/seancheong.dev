import { validateContent } from '../src/portfolio-content/server';

const issues = await validateContent(
  process.argv.includes('--release') ? 'release' : 'current',
);
if (issues.length) {
  console.error(JSON.stringify(issues, null, 2));
  process.exitCode = 1;
} else {
  console.log(
    'Portfolio content, ICU messages, explicit MDX loaders and publication rules validated.',
  );
}
