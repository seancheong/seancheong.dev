import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface CompanyImage {
  name: string;
  image: string;
  className?: string;
}

const companies: CompanyImage[] = [
  { name: 'Fuji Xerox', image: 'fujixerox.png' },
  { name: 'Thermo Fisher Scientific', image: 'thermofisher.png' },
  { name: 'Asurion', image: 'asurion.webp', className: 'my-auto h-14' },
  { name: 'Woven by TOYOTA', image: 'woven.png', className: 'h-16' },
] as const;

export const WorkedWith = () => {
  const t = useTranslations('Experience');

  return (
    <div className="bg-container rounded-lg border">
      <div className="px-6 py-5">
        <p className="text-center font-medium">{t('worked-with')}</p>
      </div>

      <Separator />

      <div className="grid gap-2 px-6 pb-4 pt-8 md:grid-cols-2 md:gap-6">
        {companies.map(({ name, image, className }) => (
          <CompanyImage
            key={name}
            name={name}
            image={image}
            className={className}
          />
        ))}
      </div>
    </div>
  );
};

const CompanyImage = ({ name, image, className = '' }: CompanyImage) => {
  return (
    <div className={twMerge('relative h-10 w-auto', className)}>
      <Image
        src={`/images/${image}`}
        alt={name}
        fill
        className="object-contain"
      />
    </div>
  );
};
