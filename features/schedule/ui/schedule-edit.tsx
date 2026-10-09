import { EMPLOYEE_TEST } from "@/bd-test/employee";
import { ScheduleFormEdit } from "@/features/schedule-edit";

export default function ScheduleEdit() {
  return (
    <ScheduleFormEdit tab="bar" schedule={null} employees={EMPLOYEE_TEST} />
  );
}
