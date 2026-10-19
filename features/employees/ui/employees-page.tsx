"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { formatShortDate } from "@/utils/get-format-date";
import { handleCopy } from "@/utils/handler-copy-text";
import { differenceInCalendarDays, differenceInMonths } from "date-fns";
import { CheckCircle, PenBox, UserX } from "lucide-react";
import { useRouter } from "next/navigation";
import { GetEmployeesData } from "@/features/employee-create/model/schema";

export function EmployeesPage({
  employees,
}: {
  employees: GetEmployeesData[];
}) {
  const router = useRouter();

  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  if (!currentDate) return null;

  const handleClickName = (id: string) => {
    router.push(`/employee/view/${id}`);
  };

  if (employees?.length === 0)
    return (
      <div className="mt-4 flex items-center justify-center text-red-600">
        <p>Нет сотрудников</p>
      </div>
    );

  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-4">
      <Table className="md:table-fixed [&>tbody>tr]:text-xs">
        <TableHeader className="text-xs">
          <TableRow className="[&>th]:text-green-600 [&>th]:font-bold [&>th]:text-center">
            <TableHead className="w-5" />
            <TableHead className="w-15">employment date</TableHead>
            <TableHead className="sticky left-0 md:w-25">name</TableHead>
            <TableHead className="w-15">current rate</TableHead>
            <TableHead className="w-20">role</TableHead>
            <TableHead className="w-30">mail</TableHead>
            <TableHead className="w-20">tel</TableHead>
            <TableHead className="w-12">total</TableHead>
            <TableHead className="w-12">used</TableHead>
            <TableHead className="w-12">remaining</TableHead>
            <TableHead className="w-15">status</TableHead>
            <TableHead className="w-15">actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {[
            ...employees
              .filter((e) => e.role === "BARMEN")
              .sort((a, b) => a.fullName.localeCompare(b.fullName)),
            ...employees
              .filter((e) => e.role === "WAITERS")
              .sort((a, b) => a.fullName.localeCompare(b.fullName)),
          ].map((emp, idx) => {
            const monthsWorked = emp.employmentDate
              ? differenceInMonths(currentDate, emp.employmentDate)
              : 0;

            const vacationDays = Math.round(monthsWorked * 2.33);

            const usedVacationDays =
              emp.vacation?.reduce(
                (acc, r) =>
                  acc +
                  differenceInCalendarDays(
                    new Date(r.endDate),
                    new Date(r.startDate),
                  ) +
                  1,
                0,
              ) ?? 0;

            return (
              <TableRow
                key={emp.id}
                className={cn(
                  "hover:text-bl cursor-pointer [&>td]:text-center",
                  !emp.employmentDate && "text-rd font-bold",
                  !emp.isActive ? "text-rd/30!" : "",
                )}
              >
                <TableCell className="text-muted-foreground font-medium">
                  {idx + 1}
                </TableCell>

                <TableCell>
                  {emp.employmentDate
                    ? formatShortDate(emp.employmentDate)
                    : "-"}
                </TableCell>

                <TableCell
                  className="bg-background sticky left-0 z-10 w-32 md:bg-transparent print:bg-transparent"
                  onClick={() => handleClickName(emp.id)}
                >
                  {emp.fullName}
                </TableCell>

                <TableCell>{Number(emp.currentRate)}</TableCell>
                <TableCell>{emp.role}</TableCell>

                <TableCell
                  className="truncate"
                  onClick={() => emp.mail && handleCopy(emp.mail)}
                >
                  {emp.mail}
                </TableCell>

                <TableCell
                  className="truncate"
                  onClick={() => emp.tel && handleCopy(emp.tel)}
                >
                  {emp.tel || "-"}
                </TableCell>

                <TableCell>{vacationDays}</TableCell>
                <TableCell>{usedVacationDays}</TableCell>
                <TableCell>{vacationDays - usedVacationDays}</TableCell>

                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    {!emp.isActive ? (
                      <UserX size={16} className="text-rd" />
                    ) : (
                      <CheckCircle size={16} className="text-bl" />
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div
                    className="flex items-center justify-center gap-2"
                    onClick={() => router.push(`/employee/edit/${emp.id}`)}
                  >
                    <PenBox
                      size={16}
                      className="text-blue-600"
                      strokeWidth={1.5}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
