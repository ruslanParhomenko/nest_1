import { getSchedule } from "./actions/get-schedule";

export default async function Home() {
  const schedule = (await getSchedule()) as any;
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {schedule.message}
    </div>
  );
}
