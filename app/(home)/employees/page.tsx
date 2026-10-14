import { EMPLOYEE_TEST } from "@/bd-test/employee";
import { EmployeesPage } from "@/features/employee";
import { getEmployees } from "@/features/employee-create/actions/get-employees";

export default async function Page() {
  const employees = await getEmployees();
  return <EmployeesPage employees={employees} />;
}
