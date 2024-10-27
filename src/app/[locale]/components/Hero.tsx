import { Button } from '@/components/ui/button';
import { DownloadIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { SendEmailButton } from './SendEmailButton';

export const Hero = () => {
  const t = useTranslations('Common');

  return (
    <>
      <div className="mb-6 flex flex-col items-center gap-2">
        <h1 className="md:text-5xl">{t('name')}</h1>

        <p className="text-lg">{t('title')}</p>
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
