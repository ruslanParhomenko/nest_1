import { Suspense } from "react";
import { EmployeesPage } from "@/features/employees";
import { getEmployees } from "@/features/employee-create/actions/get-employees";
import { SlowLoading } from "@/components/page/slow-loading";
import { getActor } from "@/lib/api";

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
  const { tab } = await searchParams;

  const actor = await getActor();

  if (tab === "null" || !tab)
    return (
      <div className="flex items-center justify-center text-blue-600 mt-12">
        выбрать категорию
      </div>
    );

  const employees = await getEmployees(actor);
  const filteredEmployees =
    employees?.filter((e) =>
      ROLE_BY_TAB[tab as keyof typeof ROLE_BY_TAB].includes(
        e.role.toLowerCase(),
      ),
    ) || [];

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
