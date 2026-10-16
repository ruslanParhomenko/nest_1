import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaneTakeoff } from "lucide-react";
import VacationDataCard from "./vacation-data-content";
import { GetEmployeesData } from "@/features/employee-create/model/schema";

export default function VacationCard({
  employee,
}: {
  employee: GetEmployeesData;
}) {
  const vacations = employee.vacation ?? [];
  return (
    <Card className="flex min-w-0 flex-col overflow-hidden shadow-md">
      <CardHeader className="py-4">
        <div className="flex min-w-0 items-center justify-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <PlaneTakeoff className="size-5 text-primary" />
          </div>

          <div className="min-w-0 space-y-1">
            <CardTitle className="text-base font-semibold tracking-tight">
              Отпуска
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-7 overflow-y-auto md:p-5">
        {vacations.length > 0 &&
          vacations.map((vacation, index) => {
            return (
              <VacationDataCard
                key={`${vacation.startDate}-${vacation.endDate}-${index}`}
                vacation={vacation}
                index={index}
              />
            );
          })}
      </CardContent>
    </Card>
  );
}
