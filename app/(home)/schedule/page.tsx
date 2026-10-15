import { getEmployees } from "@/features/employee-create/actions/get-employees";
import { SchedulePage } from "@/features/schedule";

export default async function Page() {
  const employees = await getEmployees();
  return <SchedulePage employees={employees} />;
}
