import { useClient } from '@/hooks/getContents';
import { SectionTitle } from '../ui/SectionTitle';
import { formatInTimeZone } from 'date-fns-tz';
import { getTime } from 'date-fns';

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
  const parsedISOTime = schedule.date?.match(/T(.+)$/)?.[1];
  const dateFormat =
    parsedISOTime && parsedISOTime === '00:00:00+00:00' ? 'dd.MMM.yyyy 未明' : 'yyyy-MM-dd kk:mm〜';
  return (
    <div className="flex gap-4 items-center">
      {schedule.date && <div>{formatInTimeZone(schedule.date, 'JST', dateFormat)}</div>}
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
    `
  );

  const { schedules } = data;

  const isNoSchedule = schedules.every((schedule) => !schedule.date);

  console.log('schedules', schedules);

  return (
    <div className="flex justify-center flex-col px-4 gap-4">
      <SectionTitle title="Live Schedule" />
      <div
        className={`flex flex-col gap-4  pl-4 ${isNoSchedule ? 'items-center' : 'justify-start'}`}
      >
        {isNoSchedule ? (
          <div>Coming soon ...</div>
        ) : (
          schedules.map((schedule) => (
            <ScheduleField key={schedule.id} schedule={schedule} isNoSchedule={isNoSchedule} />
          ))
        )}
      </div>
    </div>
  );
};
