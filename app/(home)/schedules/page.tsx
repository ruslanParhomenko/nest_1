import { SlowLoading } from "@/components/page/slow-loading";
import { getSchedule } from "@/features/schedule/actions/get-schedule";
import ScheduleView from "@/features/schedule/ui/schedule-view";
import { Suspense } from "react";

async function Schedule({
  searchParams,
}: {
  searchParams: Promise<{ tab: string; year: string; month: string }>;
}) {
  const { year, month, tab } = await searchParams;
  const schedule = await getSchedule({
    year: Number(year),
    month: Number(month),
    role: tab,
  });
  return <ScheduleView schedule={schedule} />;
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ tab: string; year: string; month: string }>;
}) {
  return (
    <Suspense fallback={<SlowLoading />}>
      <Schedule searchParams={searchParams} />
    </Suspense>
  );
}
