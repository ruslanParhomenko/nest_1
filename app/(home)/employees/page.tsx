import { Suspense } from "react";
import { connection } from "next/server";
import { EmployeesPage } from "@/features/employee";
import { getEmployees } from "@/features/employee-create/actions/get-employees";
import { SlowLoading } from "@/components/page/slow-loading";

async function Employees() {
  await connection();
  const employees = await getEmployees();
  return <EmployeesPage employees={employees} />;
}

export default function Page() {
  return (
    <Suspense fallback={<SlowLoading />}>
      <Employees />
    </Suspense>
  );
}
