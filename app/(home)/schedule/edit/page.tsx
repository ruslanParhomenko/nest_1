import { getEmployees } from "@/features/employee-create/actions/get-employees";
import { getSchedule } from "@/features/schedule/actions/get-schedule";
import ScheduleEdit from "@/features/schedule-edit/ui/schedule-edit";
import { Suspense } from "react";

const ROLE_BY_TAB = {
  bar: ["barmen", "waiters"],
  cook: ["cook"],
  dish: ["dish"],
};
async function ScheduleEditPage({
  searchParams,
}: {
  searchParams: Promise<{ tab: string; year: string; month: string }>;
}) {
  const { tab, year, month } = await searchParams;
  const employees = await getEmployees();
  const schedule = await getSchedule({
    year: Number(year),
    month: Number(month),
    role: tab,
  });

  const employeeByTab =
    employees?.filter((e) =>
      ROLE_BY_TAB[tab as keyof typeof ROLE_BY_TAB].includes(
        e.role.toLowerCase(),
      ),
    ) || [];
  return <ScheduleEdit employees={employeeByTab} schedule={schedule} />;
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ tab: string; year: string; month: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <ScheduleEditPage searchParams={searchParams} />
    </Suspense>
  );
}
