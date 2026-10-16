import type { GetEmployeesData } from "@/features/employee-create/model/schema";

import EmployeeCard from "./employee-card";
import VacationCard from "./vacation-card";

export function EmployeeViewPage({ employee }: { employee: GetEmployeesData }) {
  return (
    <div className="mt-4 grid w-full md:h-[88dvh]  grid-cols-1 items-stretch justify-center gap-12 md:grid-cols-[45%_45%] md:px-2">
      <EmployeeCard employee={employee} />
      <VacationCard employee={employee} />
    </div>
  );
}
