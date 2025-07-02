import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-2 md:auto-rows-[18rem] md:grid-cols-5',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  url,
  className,
  title,
  description,
  image,
  icon,
}: {
  url: string;
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  image?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  const t = useTranslations('Common');

  return (
    <Link
      href={url}
      target="_blank"
      className={cn(
        'group row-span-1 flex flex-col justify-between space-y-4 rounded-lg border bg-transparent p-4',
        className,
      )}
    >
      {image}
      <div>
        {icon}
        <h3 className="my-2 font-bold">{title}</h3>

        <p className="text-xs">{description} </p>

        <span className="text-xs font-medium text-blue-600 underline hover:no-underline dark:text-blue-500">
          {t('show-more')}
        </span>
      </div>
    </Link>
  );
};
