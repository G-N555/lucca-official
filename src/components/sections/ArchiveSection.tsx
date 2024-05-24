import { useClient } from '@/hooks/getContents';
import { SectionTitle } from '../ui/SectionTitle';
import { format } from 'date-fns';

type archive = {
  id: string;
  publishedAt: string;
  date: string | null;
  place: string;
};

type ResponseData = {
  data: {
    archives: archive[];
  };
};

const ArchiveField = (archive: archive) => {
  return (
    <div className="flex gap-4 items-center pl-4">
      {archive.date && <div>{format(archive.date, 'dd.MMM.yyyy')}</div>}
      <div>{archive.place}</div>
    </div>
  );
};

export const ArchiveSection = async () => {
  const { getContents } = useClient();

  const { data }: ResponseData = await getContents(
    `
    query Archives {
      archives(first: 10) {
        id
        publishedAt
        date
        place
      }
    }
  `,
    { Archive: { keyFields: ['id'] } }
  );

  const { archives } = data;

  return (
    <div className="flex justify-center flex-col px-4 gap-4">
      <SectionTitle title="Live archive" />
      {archives.map((archive) => (
        <ArchiveField key={archive.id} {...archive} />
      ))}
    </div>
  );
};
