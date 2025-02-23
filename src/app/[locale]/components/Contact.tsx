import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { SquareLibraryIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

import { SendEmailButton } from './SendEmailButton';

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
        <SendEmailButton
          size="lg"
          className="min-w-full gap-2 rounded-xl md:min-w-56"
        />

        <div className="flex gap-6">
          <TooltipProvider>
            <LinkTooltip tooltipText={t('Contact.tooltips.linkedin')}>
              <Link
                href="https://www.linkedin.com/in/zhen-xiong-cheong-b80630ba/"
                target="_blank"
                className="hover:text-sky-600"
              >
                <LinkedInLogoIcon className="h-6 w-6" />
                <span className="sr-only">
                  {t('Contact.aria-labels.linkedin')}
                </span>
              </Link>
            </LinkTooltip>

            <LinkTooltip tooltipText={t('Contact.tooltips.github')}>
              <Link
                href="https://github.com/seancheong"
                target="_blank"
                className="hover:text-gray-900"
              >
                <GitHubLogoIcon className="h-6 w-6" />
                <span className="sr-only">
                  {t('Contact.aria-labels.github')}
                </span>
              </Link>
            </LinkTooltip>

            <LinkTooltip tooltipText={t('Contact.tooltips.medium')}>
              <Link
                href="https://medium.com/@seancheongzhenxiong"
                target="_blank"
                className="hover:text-teal-600"
              >
                <SquareLibraryIcon />
                <span className="sr-only">
                  {t('Contact.aria-labels.medium')}
                </span>
              </Link>
            </LinkTooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

interface LinkTooltipProps {
  tooltipText: string;
}

const LinkTooltip = ({
  children,
  tooltipText,
}: PropsWithChildren<LinkTooltipProps>) => (
  <Tooltip>
    <TooltipTrigger asChild>{children}</TooltipTrigger>

    <TooltipContent>
      <p>{tooltipText}</p>
    </TooltipContent>
  </Tooltip>
);
