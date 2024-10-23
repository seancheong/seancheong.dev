import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { BackpackIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export const Projects = () => {
  const t = useTranslations('Project');

  return (
    <div className="mt-2 flex flex-col gap-2">
      <div className="flex items-center gap-6 rounded-lg border bg-container p-6">
        <div className="h-fit w-fit rounded-xl border bg-icon p-3">
          <BackpackIcon className="h-6 w-6" />
        </div>

        <h2>{t('title')}</h2>
      </div>

      <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
        {projects.map((item, i) => (
          <BentoGridItem
            key={i}
            title={t(`${item.name}.title`)}
            description={t(`${item.name}.description`)}
            image={item.image}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProjectImage = ({ src, alt, className = '' }: ProjectImageProps) => (
  <div className="relative h-full min-h-[6rem] w-full">
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className={twMerge(
        'rounded-[8px] border border-border bg-icon object-cover',
        className,
      )}
    />
  </div>
);

const projects = [
  {
    name: 'script-blender',
    image: (
      <ProjectImage
        src="/images/scriptblender.png"
        alt="Script Blender"
        className="md:object-fill"
      />
    ),
    className: 'md:col-span-2',
  },
  {
    name: 'cashush',
    image: (
      <ProjectImage
        src="/images/cashush.png"
        alt="Cashush"
        className="md:object-right"
      />
    ),
    className: 'md:col-span-1',
  },
  {
    name: 'chroma-ui',
    image: (
      <ProjectImage
        src="/images/chromaui.png"
        alt="Chroma UI"
        className="object-fill md:object-contain"
      />
    ),
    className: 'md:col-span-1',
  },
  {
    name: 'vue-task-management',
    image: (
      <ProjectImage
        src="/images/vuetaskmanagement.png"
        alt="Vue Task Management"
        className="md:object-fill"
      />
    ),
    className: 'md:col-span-2',
  },
] as const;
