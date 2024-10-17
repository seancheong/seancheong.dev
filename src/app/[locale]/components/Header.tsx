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

const sections = [
  { name: 'home', url: '#' },
  { name: 'profile', url: '#' },
  { name: 'experience', url: '#' },
  { name: 'education', url: '#' },
  { name: 'skills', url: '#' },
] as const;

export const Header = () => {
  const t = useTranslations('Common');

  return (
    <header className="sticky top-0 z-10 flex items-center rounded-b-xl bg-background pt-6">
      <nav className="bg-container flex w-full items-center justify-between rounded-2xl border p-2">
        <Button variant="secondary" size="icon" className="rounded-xl" asChild>
          <Link href="#">
            <span className="text-lg">SC</span>
            <span className="sr-only">{t('name')}</span>
          </Link>
        </Button>

        <div className="hidden gap-6 md:flex">
          {sections.map((section) => (
            <Link href="#" key={section.name}>
              {t(`nav.${section.name}`)}
            </Link>
          ))}
        </div>

        <Button className="hidden gap-2 rounded-xl md:flex" asChild>
          <Link href="#">
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
              <DropdownMenuItem key={section.name} asChild>
                <Link href="#">{t(`nav.${section.name}`)}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem>{t('contact-me')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};
