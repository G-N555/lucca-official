import { useClient } from '@/hooks/getContents';
import { SectionTitle } from '../ui/SectionTitle';
import { format } from 'date-fns';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { ElementNode } from '@graphcms/rich-text-types';

type News = {
  id: string;
  updatedAt: string;
  title: string | null;
  publishedAt: string;
  content: {
    raw: {
      type: string;
      children: Array<ElementNode>;
    };
  };
};

type ResponseData = {
  data: {
    news_all: News[];
  };
};

const NewsField = (info: News) => {
  const date = info.updatedAt || info.publishedAt;
  return (
    <div className="flex flex-col gap-4 border-b-2 border-y-current">
      {info.updatedAt && <div className="font-bold">{format(date, 'dd.MMM.yyyy')}</div>}
      <div className="flex flex-col gap-4 pl-4 pb-4">
        <RichText content={info.content.raw} />
      </div>
    </div>
  );
};

export const NewsSection = async () => {
  const { getContents } = useClient();

  const { data }: ResponseData = await getContents(
    `
        query News {
          news_all(first: 10) {
            id
            publishedAt
            updatedAt
            content{
              raw
            }
          }
        }
      `
  );

  const { news_all: news } = data;

  return (
    <div className="flex justify-center flex-col px-4 gap-4">
      <SectionTitle title="News" />
      {news?.map((info) => {
        return <NewsField key={info.id} {...info} />;
      })}
    </div>
  );
};
