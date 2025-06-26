import { Forklift } from '@/components/animate-ui/icons/forklift';
import { Separator } from '@/components/ui/separator';
import DOMPurify from 'isomorphic-dompurify';
import { useTranslations } from 'next-intl';

import { ExperienceTimeline } from './ExperienceTimeline';

export const Experience = () => {
  const t = useTranslations('Experience');

  return (
    <div className="bg-container rounded-lg border">
      <div className="flex flex-col gap-6 p-6">
        <div className="bg-icon h-fit w-fit rounded-xl border p-3">
          <Forklift animateOnHover animateOnTap className="h-6 w-6" />
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
