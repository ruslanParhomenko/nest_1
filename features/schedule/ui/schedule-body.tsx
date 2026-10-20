"use client";
import { MonthDaysCells } from "@/components/table/month-days-cells";
import { TableBody, TableRow } from "@/components/ui/table";
import { useMonthDays } from "@/hooks/use-month-days";
import ScheduleRow from "./schedule-row";
import { GetScheduleData } from "@/features/schedule-edit/model/type";

export default function ScheduleBody({
  schedule,
  selectedDay,
}: {
  schedule: GetScheduleData;
  selectedDay: number;
}) {
  const { monthDays } = useMonthDays();

  return (
    <TableBody>
      {schedule?.rowShifts.map((row, rowIndex) => {
        return (
          <ScheduleRow
            key={row.id}
            rowIndex={rowIndex}
            fieldsLength={schedule.rowShifts.length}
            row={row}
          />
        );
      })}
      {schedule?.rowShifts.length < 20 && (
        <TableRow>
          <MonthDaysCells
            monthDays={monthDays}
            selectedDay={selectedDay}
            orientation="bottom"
            colSpan={5}
            className="h-8"
          />
        </TableRow>
      )}
    </TableBody>
  );
}
