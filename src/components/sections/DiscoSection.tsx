import { useClient } from '@/hooks/getContents';
import parse from 'html-react-parser';

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

  const { data }: ResponseData = await getContents(`
    query MyQuery {
      discographies(first: 10) {
        id
        publishedAt
        title
        imageHtml{
          html
        }
      }
    }
  `);

  const { discographies } = data;

  return (
    <div className="flex justify-center">
      {discographies.map((discography) => (
        <DiscoGraphyField key={discography.id} {...discography} />
      ))}
    </div>
  );
};
