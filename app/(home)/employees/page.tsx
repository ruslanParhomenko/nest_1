import { Suspense } from "react";
import { connection } from "next/server";
import { EmployeesPage } from "@/features/employee";
import { getEmployees } from "@/features/employee-create/actions/get-employees";

async function Employees() {
  await connection();
  const employees = await getEmployees();
  return <EmployeesPage employees={employees} />;
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Employees />
    </Suspense>
  );
}
