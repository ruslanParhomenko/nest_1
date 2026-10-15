import { GetEmployeesData } from "@/features/employee-create/model/schema";
import { ScheduleFormEdit } from "@/features/schedule-edit";

export default function ScheduleEdit({
  employees,
}: {
  employees: GetEmployeesData[];
}) {
  return <ScheduleFormEdit tab="bar" schedule={null} employees={employees} />;
}
