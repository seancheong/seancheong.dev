'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HamburgerMenuIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const sections = [
  { name: 'home', url: '/' },
  { name: 'profile', url: '#profile' },
  { name: 'experience', url: '#experience' },
  { name: 'projects', url: '#projects' },
] as const;

export const Header = () => {
  const t = useTranslations('Common');
  const router = useRouter();

  const handleScrollFromDropDown = useCallback(
    // Need to add a small timeout here for the scrolling,
    // if not, it will scroll back to top automatically
    (url: string) => setTimeout(() => router.push(url), 100),
    [router],
  );

  return (
    <header className="bg-background sticky top-0 z-10 flex items-center rounded-b-xl pt-6">
      <nav className="bg-container flex w-full items-center justify-between rounded-2xl border p-2">
        <Button
          size="icon"
          className="gradient-brand flex h-8 w-8 items-center justify-center rounded-md"
          asChild
        >
          <Link href="/">
            <span className="text-sm font-bold text-white">SC</span>
            <span className="sr-only">{t('name')}</span>
          </Link>
        </Button>

        <div className="hidden gap-6 md:flex">
          {sections.map((section) => (
            <Link href={section.url} key={section.name}>
              {t(`nav.${section.name}`)}
            </Link>
          ))}
        </div>

        <Button className="hidden gap-2 rounded-xl md:flex" asChild>
          <Link href="#contact">
            <PaperPlaneIcon />
            {t('contact-me')}
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              size="icon"
              className="rounded-xl md:hidden"
            >
              <HamburgerMenuIcon className="h-6 w-6" />
              <span className="sr-only">{t('toggle-menu')}</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="text-foreground">
            {sections.map((section) => (
              <DropdownMenuItem
                key={section.name}
                onSelect={() => handleScrollFromDropDown(section.url)}
              >
                {t(`nav.${section.name}`)}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              onSelect={() => handleScrollFromDropDown('#contact')}
            >
              {t('contact-me')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};
