import { getEmployees } from "@/features/employee-create/actions/get-employees";
import ScheduleEdit from "@/features/schedule/ui/schedule-edit";

export default async function Page () {

    const employees = await getEmployees();
    return <ScheduleEdit employees={employees} schedule={null} />;
}