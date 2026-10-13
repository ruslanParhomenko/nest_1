import { EMPLOYEE_TEST } from "@/bd-test/employee";
import { EmployeesPage } from "@/features/employee";

export default async function Page() {
  return <EmployeesPage employees={EMPLOYEE_TEST} />;
}
