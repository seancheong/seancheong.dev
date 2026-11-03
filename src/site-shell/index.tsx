import { Container } from '@/components/ui/container';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { MobileNavigation } from './mobile-navigation';

export function SiteShell({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  const t = useTranslations('Shell');
  const home = `/${locale}`;
  const sections = ['experience', 'projects', 'articles', 'contact'] as const;
  const links = sections.map((section) => (
    <a
      key={section}
      href={`${home}#${section}`}
      className={section === 'contact' ? 'site-contact-link' : undefined}
    >
      {t(`navigation.${section}`)}
    </a>
  ));

  return (
    <>
      <a className="site-skip-link" href="#main-content">
        {t('skip')}
      </a>
      <header className="site-header">
        <Container>
          <nav className="site-navigation" aria-label={t('navigation-label')}>
            <a className="site-identity" href={home}>
              <span className="site-monogram" aria-hidden="true">
                sc
              </span>
              <span>{t('name')}</span>
            </a>
            <div className="site-desktop-links">{links}</div>
            <MobileNavigation label={t('menu')}>{links}</MobileNavigation>
          </nav>
        </Container>
      </header>
      <Container>
        <main id="main-content" tabIndex={-1} className="site-main">
          {children}
        </main>
        <footer className="site-footer">
          <div>
            <p>{t('name')}</p>
            <p className="text-muted-foreground">{t('location')}</p>
          </div>
          <div className="site-footer-links">
            <a href={`${home}#contact`}>{t('navigation.contact')}</a>
            <a href="https://www.linkedin.com/in/zhen-xiong-cheong-b80630ba/">
              LinkedIn
            </a>
            <a href="https://github.com/seancheong">GitHub</a>
          </div>
        </footer>
      </Container>
    </>
  );
}
