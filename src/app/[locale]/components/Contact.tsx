import { Button } from '@/components/ui/button';
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import { SquareLibraryIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export const Contact = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/images/profile.jpeg"
          alt="profile"
          width={80}
          height={80}
          className="rounded-lg border"
        />

        <div className="flex flex-col gap-1 text-center">
          <h2>{t('Contact.title')}</h2>

          <p className="text-lg">{t('Contact.description')}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <Button
          size="lg"
          className="min-w-full gap-2 rounded-xl md:min-w-56"
          asChild
        >
          <Link href="mailto:me@seancheong.dev?subject=Hello!">
            <EnvelopeClosedIcon />
            {t('Common.send-email')}
          </Link>
        </Button>

        <div className="flex gap-6">
          <Link
            href="https://www.linkedin.com/in/zhen-xiong-cheong-b80630ba/"
            target="_blank"
          >
            <LinkedInLogoIcon className="h-6 w-6" />
            <span className="sr-only">{t('Contact.aria-labels.linkedin')}</span>
          </Link>

          <Link href="https://github.com/seancheong" target="_blank">
            <GitHubLogoIcon className="h-6 w-6" />
            <span className="sr-only">{t('Contact.aria-labels.github')}</span>
          </Link>

          <Link href="https://medium.com/@seancheongzhenxiong" target="_blank">
            <SquareLibraryIcon />
            <span className="sr-only">{t('Contact.aria-labels.medium')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
