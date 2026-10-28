import {
  MotionHighlight,
  MotionHighlightItem,
} from '@/components/animate-ui/effects/motion-highlight';
import { Paintbrush } from '@/components/animate-ui/icons/paintbrush';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { getProjects } from '@/portfolio-content';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export const Projects = () => {
  const t = useTranslations('Project');
  const result = getProjects(useLocale());
  if (result.status !== 'found')
    throw new Error('Project content is unavailable or invalid');
  const projects = result.value;

  return (
    <div className="mt-2 flex flex-col gap-2">
      <div className="bg-container flex items-center gap-6 rounded-lg border p-6">
        <div className="bg-icon h-fit w-fit rounded-xl border p-3">
          <Paintbrush animateOnHover animateOnTap className="h-6 w-6" />
        </div>

        <h2>{t('title')}</h2>
      </div>

      <MotionHighlight mode="parent" hover className="bg-secondary rounded-lg">
        <BentoGrid className="mx-auto md:auto-rows-[20rem]">
          {projects.map((item) => (
            <MotionHighlightItem key={item.slug} asChild>
              <BentoGridItem
                title={item.title}
                description={item.description}
                image={
                  <ProjectImage
                    src={item.cover}
                    alt={item.coverAlt}
                    className={imageClasses[item.slug]}
                  />
                }
                url={item.destination}
                className={gridClasses[item.slug]}
              />
            </MotionHighlightItem>
          ))}
        </BentoGrid>
      </MotionHighlight>
    </div>
  );
};

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProjectImage = ({ src, alt, className = '' }: ProjectImageProps) => (
  <div className="border-border relative h-full min-h-24 w-full overflow-hidden rounded-[8px] border">
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className={twMerge(
        'bg-icon transform object-cover transition duration-500 ease-in-out group-hover:scale-105',
        className,
      )}
    />
  </div>
);

const imageClasses: Record<string, string> = {
  tripa: 'md:object-contain',
  'script-blender': 'md:object-fill',
  'chroma-ui': 'object-fill md:object-contain',
  'vue-task-management': 'md:object-fill',
};
const gridClasses: Record<string, string> = {
  tripa: 'md:col-span-5',
  'script-blender': 'md:col-span-3',
  'chroma-ui': 'md:col-span-2',
  'vue-task-management': 'md:col-span-3',
};
