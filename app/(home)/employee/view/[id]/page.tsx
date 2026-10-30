import { getEmployees } from "@/features/employee-create/actions/get-employees";
import { EmployeeViewPage } from "@/features/employee-view";
import { getActor } from "@/lib/api";
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

  if (!id) return null;

  const actor = await getActor();

  const employee =
    (await getEmployees(actor))?.find((e) => e.id === id) || null;

  if (!employee) return null;

  return <EmployeeViewPage employee={employee} />;
}
