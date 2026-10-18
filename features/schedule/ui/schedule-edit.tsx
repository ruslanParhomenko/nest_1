import { GetEmployeesData } from "@/features/employee-create/model/schema";
import { ScheduleFormEdit } from "@/features/schedule-edit";
import { GetScheduleData } from "@/features/schedule-edit/model/type";

export default function ScheduleEdit({
  schedule,
  employees,
}: {
  schedule: GetScheduleData | null;
  employees: GetEmployeesData[];
}) {
  return <ScheduleFormEdit  schedule={schedule} employees={employees} />;
}
