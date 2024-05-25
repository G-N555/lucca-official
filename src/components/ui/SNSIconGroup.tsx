'use client';

import { getSNSIcon } from '@/lib/getSNSIcon';
import { SNSIcon } from './SNSIcon';
import { useTheme } from 'next-themes';

type SNS = {
  name: string;
  url: string;
};

type SNSIconGroupProps = {
  sns: SNS[];
  classNames?: string;
};

export const SNSIconGroup = ({ sns, classNames }: SNSIconGroupProps) => {
  const { theme } = useTheme();

  return (
    theme && (
      <div className={`flex gap-4 items-center ${classNames}`}>
        {sns.map((snsItem) => {
          const snsIcon = getSNSIcon({ theme, snsName: snsItem.name });
          return <SNSIcon key={snsItem.name} sns={snsItem} snsIcon={snsIcon} />;
        })}
      </div>
    )
  );
};
