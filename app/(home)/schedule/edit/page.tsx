import { getEmployees } from "@/features/employee-create/actions/get-employees";
import { ScheduleType } from "@/features/schedule-edit/model/schema";
import { GetScheduleData } from "@/features/schedule-edit/model/type";
import { getSchedule } from "@/features/schedule/actions/get-schedule";
import ScheduleEdit from "@/features/schedule/ui/schedule-edit";
import { Suspense } from "react";


const ROLE_BY_TAB = {
  bar: ["barmen", "waiters"],
  cook: ["cook"],
  dish: ["dish"],
};
 async function ScheduleEditPage ({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ tab: string }>;

}) {
    const { id } = await params;


  
const { tab } = await searchParams;
    const employees = await getEmployees();

    const schedule = id ? await getSchedule() as GetScheduleData : null;

    const employeeByTab = employees.filter((e) =>
        ROLE_BY_TAB[tab as keyof typeof ROLE_BY_TAB].includes(e.role.toLowerCase()),
    );
    return <ScheduleEdit employees={employeeByTab} schedule={schedule} />;
}

export default function Page({ params , searchParams}: { params: Promise<{ id: string }> ; searchParams: Promise<{ tab: string }>}) {
    return (
        <Suspense fallback={null}>
            <ScheduleEditPage params={params} searchParams={searchParams} />
        </Suspense>
    );
}