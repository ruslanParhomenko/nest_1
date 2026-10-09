"use client";
import { MonthDaysCells } from "@/components/table/month-days-cells";
import { TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useMonthDays } from "@/hooks/use-month-days";
import { MONTHS } from "@/lib/utils";

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
      
        <TableCell colSpan={6} className={"w-34"}/>
        <TableCell className="w-24 pl-2 font-bold tracking-wider text-blue-800">
          {MONTHS[month - 1].toUpperCase() || ""}
        </TableCell>

        <MonthDaysCells
          monthDays={monthDays}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          orientation="top"
          className="w-8.5 print:w-7.5"
        />

        <TableCell className="w-4 p-0" />
      </TableRow>
    </TableHeader>
  );
}
