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

type GenerateSNSProps = {
  theme: string;
  snsName: string;
};

export const getSNSIcon = ({ theme, snsName }: GenerateSNSProps) => {
  const snsMap: { [key: string]: SNSIcon } = {
    youtube: {
      icon: theme === 'dark' ? youtubeDark : youtubeLight,
      width: 80,
      height: 40,
    },
    x: {
      icon: theme === 'dark' ? xDark : xLight,
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
