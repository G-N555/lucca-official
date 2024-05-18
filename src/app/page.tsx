import { useClient } from '@/hooks/getContents';
import { DiscoSection } from '@/components/sections/DiscoSection';
import { VideoSection } from '@/components/sections/VideoSection';
import { CustomDivider } from '@/components/ui/CustomDivider';
import { SNSSection } from '@/components/sections/SNSSection';
import { ScheduleSection } from '@/components/sections/ScheduleSection';
import { ArchiveSection } from '@/components/sections/ArchiveSection';
import { MemberSection } from '@/components/sections/MemberSecrtion';

export default async function Home() {
  const { getContents } = useClient();

  const { data } = await getContents(`
    query MyQuery {
      news_all(first: 10) {
        id
        publishedAt
        title
        content {
          html
        }
      }
    }
  `);

  return (
    <main className="flex flex-col gap-8 overflow-scroll">
      <DiscoSection />
      <CustomDivider />
      <VideoSection />
      <CustomDivider />
      <SNSSection />
      <CustomDivider />
      <ScheduleSection />
      <CustomDivider />
      <ArchiveSection />
      <CustomDivider />
      <MemberSection />
    </main>
  );
}
