"use client";
import { MonthDaysCells } from "@/components/table/month-days-cells";
import { TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useMonthDays } from "@/hooks/use-month-days";
import { MONTHS } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function ScheduleHeaderEdit({
  addNewRow,
  selectedDay,
  setSelectedDay,
}: {
  addNewRow: () => void;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
}) {
  const { monthDays, month } = useMonthDays();
  return (
    <TableHeader>
      <TableRow className="border-0!">
        <TableCell className="w-6 p-0">
          <button
            type="button"
            onClick={() => addNewRow()}
            className="flex cursor-pointer items-center justify-center hover:text-black"
          >
            <Plus size={16} className="text-red-600" strokeWidth={2} />
          </button>
        </TableCell>
        <TableCell colSpan={5} className={"w-34"}></TableCell>
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
