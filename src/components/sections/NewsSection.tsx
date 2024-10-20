import { useClient } from '@/hooks/getContents';
import { SectionTitle } from '../ui/SectionTitle';
import { format } from 'date-fns';

type News = {
  id: string;
  updatedAt: string;
  title: string | null;
  content: string;
};

type ResponseData = {
  data: {
    news: News[];
  };
};

const NewsField = (info: News) => {
  return (
    <div className="flex gap-4 items-center pl-4">
      {info.updatedAt && <div>{format(info.updatedAt, 'dd.MMM.yyyy')}</div>}
      <div>{info.content}</div>
    </div>
  );
};

export const NewsSection = async () => {
  const { getContents } = useClient();
  const { data }: ResponseData = await getContents(
    `
      query News {
        news(first: 10) {
          id
          publishedAt
          title
          content
        }
      }
    `
  );

  const { news } = data;

  console.log('news', news);

  return (
    <div className="flex justify-center flex-col px-4 gap-4">
      <SectionTitle title="Live archive" />
      {news.map((info) => (
        <NewsField key={info.id} {...info} />
      ))}
    </div>
  );
};
