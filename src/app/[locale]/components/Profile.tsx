import { AvatarIcon, SewingPinIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export const Profile = () => {
  const t = useTranslations('Profile');

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="relative h-[400px] w-auto md:h-auto md:max-w-72 md:flex-1">
        <Image
          src="/images/profile.jpg"
          alt="profile"
          priority
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="rounded-lg border object-cover"
        />
      </div>

      <div className="flex flex-col gap-12 rounded-lg border bg-container p-6 md:flex-1">
        <div className="h-fit w-fit rounded-xl border bg-icon p-3">
          <AvatarIcon className="h-6 w-6" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2>{t('title')}</h2>

            <p>{t('detail')}</p>
          </div>

          <div className="flex items-center gap-2">
            <SewingPinIcon />
            <span className="text-xs">{t('location')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
