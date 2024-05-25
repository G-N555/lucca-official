import { useClient } from '@/hooks/getContents';
import { SectionTitle } from '../ui/SectionTitle';
import parse, { Element } from 'html-react-parser';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { SNSIconGroup } from '../ui/SNSIconGroup';

type SNS = {
  name: string;
  url: string;
};

type Member = {
  id: string;
  publishedAt: string;
  name: string;
  image: {
    html: string;
  };
  content: {
    html: string;
  };
  sns: SNS[];
  part: string;
};

type ResponseData = {
  data: {
    members: Member[];
  };
};

type MemberFieldProps = {
  member: Member;
};

const MemberField = ({ member }: MemberFieldProps) => {
  const { image, name, sns, part, content } = member;
  const imageDom = parse(image.html, {
    replace(domNode) {
      if (domNode instanceof Element && domNode.name === 'img') {
        return (
          <Image
            className="rounded-md"
            src={domNode.attribs.src}
            alt={name}
            width={200}
            height={200}
          />
        );
      }
    },
  });
  return (
    <div className="grid grid-cols-2 gap-4 items-start pl-4">
      <div>{imageDom}</div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body1">{part}</Typography>
        </div>
        {<SNSIconGroup sns={sns} />}
        {content && <div>{parse(content.html)}</div>}
      </div>
    </div>
  );
};

export const MemberSection = async () => {
  const { getContents } = useClient();
  const { data }: ResponseData = await getContents(
    `
      query Members {
        members(first: 10) {
          id
          publishedAt
          name
          image{
            html
          }
          content{
            html
          }
          sns    
          part
        }
      }
    `
  );

  const { members } = data;

  return (
    <div className="flex justify-center flex-col px-4 gap-4">
      <SectionTitle title="Members" />
      {members.map((member) => (
        <MemberField key={member.id} member={member} />
      ))}
    </div>
  );
};
