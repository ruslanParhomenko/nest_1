import { Suspense } from "react";
import { connection } from "next/server";
import { EmployeesPage } from "@/features/employees";
import { getEmployees } from "@/features/employee-create/actions/get-employees";
import { SlowLoading } from "@/components/page/slow-loading";

const ROLE_BY_TAB = {
  bar: ["barmen", "waiters"],
  cook: ["cook"],
  dish: ["dish"],
};

async function Employees({
  searchParams,
}: {
  searchParams: Promise<{ tab: string }>;
}) {
  await connection();
  const { tab } = await searchParams;

  if (tab === "null" || !tab) return null;

  const employees = await getEmployees();
  const filteredEmployees = employees.filter((e) =>
    ROLE_BY_TAB[tab as keyof typeof ROLE_BY_TAB].includes(e.role.toLowerCase()),
  );

  return <EmployeesPage employees={filteredEmployees} />;
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ tab: string }>;
}) {
  return (
    <Suspense fallback={<SlowLoading />}>
      <Employees searchParams={searchParams} />
    </Suspense>
  );
}
