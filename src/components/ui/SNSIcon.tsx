import Image, { StaticImageData } from 'next/image';

type SNSIconProps = {
  sns: {
    name: string;
    url: string;
  };
  snsIcon: {
    icon: StaticImageData;
    width: number;
    height: number;
  };
};

export const SNSIcon = ({ sns, snsIcon }: SNSIconProps) => {
  return (
    sns &&
    snsIcon && (
      <a
        key={sns.name}
        href={sns.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center text-2xl ${
          sns.name === 'youtube' ? 'w-14 h-6 md:w-20 md:h-8' : 'w-6 h-6 md:w-8 md:h-8'
        }`}
      >
        <Image src={snsIcon.icon} alt={sns.name} width={snsIcon.width} height={snsIcon.height} />
      </a>
    )
  );
};
