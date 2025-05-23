import { DiscoSection } from '@/components/sections/DiscoSection';
import { VideoSection } from '@/components/sections/VideoSection';
import { CustomDivider } from '@/components/ui/CustomDivider';
import { SNSSection } from '@/components/sections/SNSSection';
import { ScheduleSection } from '@/components/sections/ScheduleSection';
import { ArchiveSection } from '@/components/sections/ArchiveSection';
import { MemberSection } from '@/components/sections/MemberSection';
import { NewsSection } from '@/components/sections/NewsSection';

export default function Home() {
  return (
    <main className="flex flex-col gap-8">
      <NewsSection />
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
