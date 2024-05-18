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
        className="text-2xl"
      >
        <Image src={snsIcon.icon} alt={sns.name} width={snsIcon.width} height={snsIcon.height} />
      </a>
    )
  );
};
