import { SlowLoading } from "@/components/page/slow-loading";
import { ScheduleView } from "@/features/schedule";
import { getSchedule } from "@/features/schedule/actions/get-schedule";
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
  if (!tab || !year || !month)
    return (
      <div className="text-red-600 flex items-center justify-center">
        выбрать роль и дату
      </div>
    );
  return <ScheduleView schedule={schedule || null} tab={tab} />;
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
