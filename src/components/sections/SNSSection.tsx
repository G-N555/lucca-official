'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { SectionTitle } from '../ui/SectionTitle';
import { getSNSIcon } from '@/lib/getSNSIcon';
import { SNSIcon } from '../ui/SNSIcon';

const snsList = [
  {
    name: 'youtube',
    url: 'https://www.youtube.com/channel/UCftKOgkaKcwwEXimd1-WQ7Q',
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/lucca__band/',
  },
  {
    name: 'x',
    url: 'https://twitter.com/lucca__band',
  },
  // {
  //   name: 'facebook',
  //   url: 'https://www.facebook.com/',
  // },
];

export const SNSSection = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-4 px-4">
      <SectionTitle title="Official SNS" />
      {theme && (
        <div className="flex gap-10 items-center justify-around">
          {snsList.map((sns) => {
            const snsIcon = getSNSIcon({ theme, snsName: sns.name });
            return <SNSIcon key={sns.name} sns={sns} snsIcon={snsIcon} />;
          })}
        </div>
      )}
    </div>
  );
};
