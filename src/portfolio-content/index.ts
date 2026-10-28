import { createPortfolioContent } from './model';
import { configuration } from './registry';

export { createPortfolioContent, evidenceStates } from './model';
export type {
  ContentConfiguration,
  ContentIssue,
  ContentResult,
  CaseStudyResult,
  Messages,
} from './model';
export {
  isContentLocale,
  isPublishedLocale,
  plannedLocales,
  publishedLocales,
} from './locales';
export type { ContentLocale, PublishedLocale } from './locales';
export const portfolioContent = createPortfolioContent(configuration);
export const {
  getProject,
  getProjects,
  getFeaturedProjects,
  getCuratedNotes,
  getLocaleMessages,
  getSiteMetadata,
  getCaseStudyLocales,
  getPublishedWorkParams,
} = portfolioContent;
