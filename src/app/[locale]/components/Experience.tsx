import { Separator } from '@/components/ui/separator';
import { ArchiveIcon } from '@radix-ui/react-icons';
import DOMPurify from 'isomorphic-dompurify';
import { useTranslations } from 'next-intl';

import { ExperienceTimeline } from './ExperienceTimeline';

export const Experience = () => {
  const t = useTranslations('Experience');

  return (
    <div className="rounded-lg border bg-container">
      <div className="flex flex-col gap-6 p-6">
        <div className="h-fit w-fit rounded-xl border bg-icon p-3">
          <ArchiveIcon className="h-6 w-6" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2>{t('title')}</h2>

            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(t.raw('detail')),
              }}
              className="pl-6"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="p-8">
        <ExperienceTimeline />
      </div>
    </div>
  );
};
