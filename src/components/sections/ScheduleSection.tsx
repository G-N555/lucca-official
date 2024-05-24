import { useClient } from '@/hooks/getContents';
import { SectionTitle } from '../ui/SectionTitle';
import { format } from 'date-fns';

type Schedule = {
  id: string;
  publishedAt: string;
  date: string | null;
  place: string;
};

type ResponseData = {
  data: {
    schedules: Schedule[];
  };
};

type ScheduleFieldProps = {
  schedule: Schedule;
  isNoSchedule: boolean;
};

const ScheduleField = ({ schedule, isNoSchedule }: ScheduleFieldProps) => {
  return (
    <div className={`flex flex-col gap-4 items-center ${!isNoSchedule ? 'pl-4' : ''}`}>
      {schedule.date && <div>{format(schedule.date, 'dd/MMM/yyyy')}</div>}
      <div>{schedule.place}</div>
    </div>
  );
};

export const ScheduleSection = async () => {
  const { getContents } = useClient();

  const { data }: ResponseData = await getContents(
    `
    query Schedules {
      schedules(first: 10) {
        id
        publishedAt
        date
        place
      }
    }
  `,
    { Schedule: { keyFields: ['id'] } }
  );

  const { schedules } = data;

  const isNoSchedule = schedules.every((schedule) => !schedule.date);

  return (
    <div className="flex justify-center flex-col px-4 gap-4">
      <SectionTitle title="Live Schedule" />
      {schedules.map((schedule) => (
        <ScheduleField key={schedule.id} schedule={schedule} isNoSchedule={isNoSchedule} />
      ))}
    </div>
  );
};
