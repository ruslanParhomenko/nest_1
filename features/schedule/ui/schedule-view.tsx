import { GetScheduleData } from "@/features/schedule-edit/model/type";

export default function ScheduleView({
  schedule,
}: {
  schedule: GetScheduleData;
}) {
  console.log("schedule", schedule);
  return (
    <div className="flex h-dvh items-center justify-center">ScheduleView</div>
  );
}
