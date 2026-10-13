"use client";

import { useEffect, useState } from "react";
import { Employee } from "@/bd-test/employee";
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
import { differenceInMonths } from "date-fns";
import { CheckCircle, UserX } from "lucide-react";

export function EmployeesPage({ employees }: { employees: Employee[] }) {
  const tab = "WAITERS";

  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  if (!tab || !currentDate) return null;

  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-4">
      <Table className="md:table-fixed [&>tbody>tr]:text-xs">
        <TableHeader className="text-xs">
          <TableRow className="text-gr">
            <TableHead className="w-5" />
            <TableHead className="w-15" />
            <TableHead className="sticky left-0 md:w-25" />
            <TableHead className="w-15" />
            <TableHead className="w-20" />
            <TableHead className="w-30" />
            <TableHead className="w-20" />
            <TableHead className="w-12">total</TableHead>
            <TableHead className="w-12">used</TableHead>
            <TableHead className="w-12">...</TableHead>
            <TableHead className="w-15">status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {[...employees]
            .sort((a, b) => a.fullName.localeCompare(b.fullName))
            .map((emp, idx) => {
              const monthsWorked = emp.employmentDate
                ? differenceInMonths(currentDate, emp.employmentDate)
                : 0;

              const vacationDays = Math.round(monthsWorked * 2.33);

              const usedVacationDays =
                emp.vacation?.reduce(
                  (acc, r) => acc + Number(r.countDays),
                  0,
                ) ?? 0;

              return (
                <TableRow
                  key={emp.id}
                  className={cn(
                    "hover:text-bl cursor-pointer",
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
                    onClick={() => handleCopy(emp.fullName)}
                  >
                    {emp.fullName}
                  </TableCell>

                  <TableCell>{Number(emp.rate)}</TableCell>
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
                    {!emp.isActive ? (
                      <UserX size={14} className="text-rd" />
                    ) : (
                      <CheckCircle size={14} className="text-bl" />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
