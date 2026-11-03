import { getHomeContent } from '@/portfolio-content';
import Image from 'next/image';

export const ExperienceTimeline = () => {
  const content = getHomeContent('en');
  if (content.status !== 'found') throw new Error('Career content unavailable');
  return (
    <ol className="flex flex-col gap-8">
      {content.value.career.map((job) => (
        <li key={job.id}>
          <h3>
            <Image src={job.logo} alt={job.name} width={200} height={48} />
          </h3>
          <p>{job.role}</p>
          <p>{job.dates}</p>
          <p>{job.city}</p>
        </li>
      ))}
    </ol>
  );
};
