import { cn } from '@/lib/utils';

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
        'mx-auto grid max-w-7xl grid-cols-1 gap-2 md:auto-rows-[18rem] md:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  image,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  image?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'row-span-1 flex flex-col justify-between space-y-4 rounded-lg border bg-container p-4',
        className,
      )}
    >
      {image}
      <div>
        {icon}
        <h3 className="my-2 font-bold">{title}</h3>

        <p className="text-xs">{description}</p>
      </div>
    </div>
  );
};
