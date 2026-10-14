import { EMPLOYEE_TEST } from "@/bd-test/employee";
import { EmployeeCreatePage } from "@/features/employee-create";
import { Suspense } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={null}>
      <EmployeeCreatePageResolver params={params} />
    </Suspense>
  );
}

async function EmployeeCreatePageResolver({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EmployeeCreatePage id={id} employees={EMPLOYEE_TEST} />;
}