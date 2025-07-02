import { RotatingText } from '@/components/animate-ui/text/rotating';
import { TypingText } from '@/components/animate-ui/text/typing';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { SendEmailButton } from './SendEmailButton';

const roles = [
  'frontend-team-lead',
  'frontend-engineer',
  'fullstack-engineer',
  'aws-solutions-architect',
  'scrum-master',
] as const;

export const Hero = () => {
  const t = useTranslations('Common');

  return (
    <>
      <div className="mb-6 flex flex-col items-center gap-2">
        <div className="bg-brand-primary/10 text-brand-primary mb-4 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium">
          <span className="bg-success mr-2 h-2 w-2 rounded-full" />
          {t('available-for-new-opportunities')}
        </div>

        <h1 className="md:text-5xl">
          <TypingText text={t('title')} />
        </h1>

        <h2>
          <RotatingText
            className="text-center md:text-2xl"
            duration={4000}
            text={roles.map((role) => t(`roles.${role}`))}
            transition={{
              duration: 0.4,
              ease: 'easeInOut',
            }}
          />
        </h2>
      </div>

      <div className="flex flex-col justify-center gap-2 md:flex-row">
        <SendEmailButton className="gap-2 rounded-xl" />

        <Button variant="secondary" className="gap-2 rounded-xl" asChild>
          <Link
            href="https://sean-certification.s3.ap-southeast-1.amazonaws.com/Cheong+Zhen+Xiong+Senior+Software+Engineer+Resume.pdf"
            target="_blank"
          >
            <DownloadIcon />
            <span>{t('download-cv')}</span>
          </Link>
        </Button>
      </div>
    </>
  );
};
