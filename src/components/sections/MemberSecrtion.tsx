'use client';

import { useClient } from '@/hooks/getContents';
import { SectionTitle } from '../ui/SectionTitle';
import parse, { Element } from 'html-react-parser';
import { SNSIcon } from '../ui/SNSIcon';
import { getSNSIcon } from '@/lib/generateSNS';
import { useTheme } from 'next-themes';
import { Suspense, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Image from 'next/image';

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
  const { theme } = useTheme();
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
    <div className="flex gap-4 items-center pl-4">
      <div>{imageDom}</div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body1">{part}</Typography>
        </div>
        {theme && (
          <div className="flex gap-4 items-center">
            {sns.map((snsItem) => {
              const snsIcon = getSNSIcon({ theme, snsName: snsItem.name });
              return <SNSIcon key={snsItem.name} sns={snsItem} snsIcon={snsIcon} />;
            })}
          </div>
        )}
        {content && <div>{parse(content.html)}</div>}
      </div>
    </div>
  );
};

export const MemberSection = () => {
  const { getContents } = useClient();
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data }: ResponseData = await getContents(`
        query MyQuery {
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
      `);
      setMembers(data.members);
    };
    fetchMembers();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex justify-center flex-col px-4 gap-4">
        <SectionTitle title="Members" />
        {members.map((member) => (
          <MemberField key={member.id} member={member} />
        ))}
      </div>
    </Suspense>
  );
};
