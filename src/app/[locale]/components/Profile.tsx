import { MapPin } from '@/components/animate-ui/icons/map-pin';
import { UserRound } from '@/components/animate-ui/icons/user-round';
import { differenceInYears } from 'date-fns';
import DOMPurify from 'isomorphic-dompurify';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useMemo } from 'react';

const experienceYears = differenceInYears(new Date(), new Date(2011, 6, 1));

export const Profile = () => {
  const t = useTranslations('Profile');

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="relative h-[400px] w-auto md:h-auto md:max-w-72 md:flex-1">
        <Image
          src="/images/portrait.jpg"
          alt="portrait"
          priority
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="rounded-lg border object-cover"
        />
      </div>

      <div className="bg-container flex flex-col gap-6 rounded-lg border p-6 md:flex-1">
        <div className="bg-icon h-fit w-fit rounded-xl border p-3">
          <UserRound animateOnHover animateOnTap className="h-6 w-6" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2>{t('title')}</h2>

            <p
              dangerouslySetInnerHTML={useMemo(
                () => ({
                  __html: DOMPurify.sanitize(
                    t
                      .raw('detail')
                      .replace('{year}', experienceYears.toString()),
                  ),
                }),
                [t],
              )}
            />
          </div>

          <div className="flex items-center gap-2">
            <MapPin
              animateOnDefault="path-loop"
              animateOnHover="wiggle"
              animateOnTap="wiggle"
              className="h-6 w-6"
            />
            <span className="text-xs font-semibold">{t('location')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
