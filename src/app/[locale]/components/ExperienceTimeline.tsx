import { Badge } from '@/components/ui/badge';
import { CalendarIcon } from '@radix-ui/react-icons';
import { useFormatter, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

const companyExperiences = [
  {
    id: 4,
    duration: { from: new Date('2023-10-01'), to: null },
    title: 'senior-software-engineer',
    company: {
      name: 'Woven by TOYOTA',
      location: 'tokyo',
      image: 'woven.png',
      classname: 'h-10 w-20',
    },
    skills: ['React', 'Nextjs', 'SWR', 'Webapp'],
  },
  {
    id: 3,
    duration: { from: new Date('2018-09-01'), to: new Date('2023-10-01') },
    title: 'frontend-team-lead',
    company: {
      name: 'Asurion',
      location: 'tokyo',
      image: 'asurion.webp',
      classname: 'h-8 w-20',
    },
    skills: [
      'React',
      'Vuejs',
      'Angular',
      'Electron',
      'Webview',
      'Swift',
      'Kotlin',
    ],
  },
  {
    id: 2,
    duration: { from: new Date('2015-10-01'), to: new Date('2018-09-01') },
    title: 'software-engineer-2',
    company: {
      name: 'Thermo Fisher Scientific',
      location: 'singapore',
      image: 'thermofisher.png',
      classname: 'h-8 w-20',
    },
    skills: ['AngularJS', 'Java', 'SpringMVC', 'AWS'],
  },
  {
    id: 1,
    duration: { from: new Date('2011-07-01'), to: new Date('2015-10-01') },
    title: 'software-engineer',
    company: {
      name: 'Fuji Xerox',
      location: 'singapore',
      image: 'fujixerox.png',
      classname: 'h-8 w-20',
    },
    skills: ['C++', 'Java', 'UI'],
  },
] as const;

export const ExperienceTimeline = () => {
  const t = useTranslations('Common');
  const format = useFormatter();

  const formatDuration = useCallback(
    (duration: (typeof companyExperiences)[number]['duration']) => {
      const dateTimeFormat = { year: 'numeric', month: 'short' } as const;

      // past duration
      if (duration.to) {
        return format.dateTimeRange(duration.from, duration.to, dateTimeFormat);
      }

      // current duration
      return `${format.dateTime(duration.from, dateTimeFormat)} - ${t('now')}`;
    },
    [format, t],
  );

  return (
    <div className="flex flex-col gap-6">
      {companyExperiences.map(({ id, duration, title, company, skills }) => (
        <div key={id} className="flex">
          <div className="pt-2">
            <div className="bg-icon h-full w-[2px]" />
          </div>

          <div className="-ml-1 flex w-full items-start justify-start gap-4">
            <div className="bg-timeline mt-1 h-[6px] w-[6px] rounded-full" />

            <div key={id} className="flex w-full flex-col gap-3">
              <div className="flex flex-col gap-3 md:flex-row-reverse md:justify-between">
                <div className="border-primary/20 flex w-fit gap-2 rounded-[8px] border px-3 py-1">
                  <CalendarIcon />

                  <p className="text-xs">{formatDuration(duration)}</p>
                </div>

                <h3>{t(`titles.${title}`)}</h3>
              </div>

              <div className={twMerge('relative', company.classname)}>
                <Image
                  src={`/images/${company.image}`}
                  alt={company.name}
                  fill
                  sizes="50vw"
                  className="object-contain"
                />
              </div>

              <p className="text-xs">{t(`locations.${company.location}`)}</p>

              <div className="grid-cols-auto-fill grid gap-1">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="border-accent-foreground bg-accent text-accent-foreground justify-center rounded-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
