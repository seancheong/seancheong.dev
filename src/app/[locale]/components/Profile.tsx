import { AvatarIcon, SewingPinFilledIcon } from '@radix-ui/react-icons';
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
          className="rounded-lg border object-cover"
        />
      </div>

      <div className="bg-container flex flex-col gap-12 rounded-lg border p-6 md:flex-1">
        <div className="bg-icon h-fit w-fit rounded-xl border p-3">
          <AvatarIcon className="h-6 w-6" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2>{t('title')}</h2>

            <p>{t('detail')}</p>
          </div>

          <div className="flex items-center gap-2">
            <SewingPinFilledIcon className="text-primary" />
            <span className="text-xs">{t('location')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
