import { useClient } from '@/hooks/getContents';
import { SectionTitle } from '../ui/SectionTitle';
import { SNSIconGroup } from '../ui/SNSIconGroup';

type SNS = {
  id: string;
  publishedAt: string;
  snsList: {
    name: string;
    url: string;
  }[];
};

type ResponseData = {
  data: {
    snsContents: SNS[];
  };
};

export const SNSSection = async () => {
  const { getContents } = useClient();

  const { data }: ResponseData = await getContents(
    `
      query SNS {
        snsContents(first: 10) {
          id
          publishedAt
          snsList
        }
      }
    `
  );

  const { snsContents } = data;

  return (
    <div className="flex flex-col gap-4 px-4">
      <SectionTitle title="Official SNS" />
      <SNSIconGroup sns={snsContents[0].snsList} classNames="gap-10 justify-around" />
    </div>
  );
};
