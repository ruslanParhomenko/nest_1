"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetEmployeesData } from "@/features/employee-create/model/schema";
import {
  CalendarCheck,
  CalendarDays,
  Mail,
  Phone,
  PlaneTakeoff,
  User,
  Users2,
  Wallet,
} from "lucide-react";
import EmployeeDataCard from "./employee-data-content";
import { differenceInCalendarDays, differenceInMonths } from "date-fns";
import { formatDate } from "@/utils/get-format-date";

export default function EmployeeCard({
  employee,
}: {
  employee: GetEmployeesData;
}) {
  const currentDate = new Date();

  const monthsWorked = employee.employmentDate
    ? differenceInMonths(currentDate, employee.employmentDate)
    : 0;

  const vacationDays = Math.round(monthsWorked * 2.33);

  const usedVacationDays = employee.vacation
    ? employee.vacation.reduce(
        (acc, v) => acc + differenceInCalendarDays(v.endDate, v.startDate) + 1,
        0,
      )
    : 0;
  return (
    <Card className="flex flex-col shadow-md">
      <CardHeader className="py-4">
        <div className="flex  items-center justify-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Users2 className="size-5 text-primary" />
          </div>

          <div className="min-w-0 space-y-1">
            <CardTitle className="text-base font-semibold tracking-tight">
              {employee.fullName}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-7 overflow-y-auto md:p-5">
        <EmployeeDataCard
          icon={User}
          textCard={"role"}
          value={employee.role ?? "—"}
        />

        <EmployeeDataCard
          icon={Wallet}
          textCard={"rate"}
          value={employee.currentRate ?? "—"}
        />
        <EmployeeDataCard
          icon={Mail}
          textCard={"mail"}
          value={employee.mail ?? "—"}
        />
        <EmployeeDataCard
          icon={Phone}
          textCard={"tel"}
          value={employee.tel ?? "—"}
        />
        <EmployeeDataCard
          icon={CalendarDays}
          textCard={"employment date"}
          value={
            employee.employmentDate ? formatDate(employee.employmentDate) : "—"
          }
        />
        <EmployeeDataCard
          icon={CalendarCheck}
          textCard={"total vacations"}
          value={vacationDays.toString()}
        />
        <EmployeeDataCard
          icon={PlaneTakeoff}
          textCard={"used vacations"}
          value={usedVacationDays.toString()}
        />
      </CardContent>
    </Card>
  );
}
