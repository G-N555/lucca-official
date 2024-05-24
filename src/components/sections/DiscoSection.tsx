import { useClient } from '@/hooks/getContents';
import parse from 'html-react-parser';
import { SectionTitle } from '../ui/SectionTitle';

type DiscoGraphy = {
  id: string;
  publishedAt: string;
  title: string;
  imageHtml: {
    html: string;
  };
};

type ResponseData = {
  data: {
    discographies: DiscoGraphy[];
  };
};

const DiscoGraphyField = (discography: DiscoGraphy) => {
  const { title, imageHtml } = discography;
  return (
    <div className="flex flex-col gap-4 items-center">
      <div>{title}</div>
      <div>{parse(imageHtml.html)}</div>
    </div>
  );
};

export const DiscoSection = async () => {
  const { getContents } = useClient();

  const { data }: ResponseData = await getContents(
    `
    query DiscoGraphy {
      discographies(first: 10) {
        id
        publishedAt
        title
        imageHtml{
          html
        }
      }
    }
  `,
    { DiscoGraphy: { keyFields: ['id'] } }
  );

  const { discographies } = data;

  return (
    <div className="flex justify-center flex-col gap-4 px-4">
      <SectionTitle title="Discography" />
      {discographies.map((discography) => (
        <DiscoGraphyField key={discography.id} {...discography} />
      ))}
    </div>
  );
};
