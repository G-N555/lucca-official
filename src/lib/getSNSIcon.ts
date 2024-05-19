import { StaticImageData } from 'next/image';
import youtubeDark from '@/assets/sns-image/youtube/youtube-dark.png';
import youtubeLight from '@/assets/sns-image/youtube/youtube-light.png';
import xDark from '@/assets/sns-image/x/x-dark.png';
import xLight from '@/assets/sns-image/x/x-light.png';
import instagram from '@/assets/sns-image/instagram.png';
import facebook from '@/assets/sns-image/facebook.png';

type SNSIcon = {
  icon: StaticImageData;
  width: number;
  height: number;
};

type getSNSIconProps = {
  theme: string;
  snsName: string;
};

export const getSNSIcon = ({ theme, snsName }: getSNSIconProps) => {
  const isDarkSystem = window.matchMedia('(prefers-color-scheme: dark)').matches;
  console.log('isDarkSystem', isDarkSystem);
  const snsMap: { [key: string]: SNSIcon } = {
    youtube: {
      icon: theme === 'dark' || (theme === 'system' && isDarkSystem) ? youtubeDark : youtubeLight,
      width: 80,
      height: 40,
    },
    x: {
      icon: theme === 'dark' || (theme === 'system' && isDarkSystem) ? xDark : xLight,
      width: 40,
      height: 40,
    },
    instagram: {
      icon: instagram,
      width: 40,
      height: 40,
    },
    facebook: {
      icon: facebook,
      width: 40,
      height: 40,
    },
  };
  return snsMap[snsName];
};
