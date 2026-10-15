"use client";
import { MonthDaysCells } from "@/components/table/month-days-cells";
import { TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useMonthDays } from "@/hooks/use-month-days";
import { MONTHS } from "@/utils/get-month-days";

export default function ScheduleTableHeader({
  selectedDay,
  setSelectedDay,
}: {
  selectedDay: number;
  setSelectedDay: (day: number) => void;
}) {
  const { monthDays, month } = useMonthDays();
  return (
    <TableHeader>
      <TableRow className="border-0!">
        <TableCell className="w-6" />
        <TableCell className="w-9" />
        <TableCell className="w-9" />
        <TableCell className="w-14" />
        <TableCell className="w-32 font-bold tracking-wider text-blue-800">
          {MONTHS[month - 1].toUpperCase() || ""}
        </TableCell>

        <MonthDaysCells
          monthDays={monthDays}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          orientation="top"
          className="w-8 print:w-7.5"
        />

        <TableCell className="w-6 p-0" />
      </TableRow>
    </TableHeader>
  );
}
