import { EmployeeCreatePage } from "@/features/employee-create";
import { getEmployees } from "@/features/employee-create/actions/get-employees";
import { Suspense } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
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
  const employees = await getEmployees();
  return <EmployeeCreatePage id={id} employees={employees} />;
}
