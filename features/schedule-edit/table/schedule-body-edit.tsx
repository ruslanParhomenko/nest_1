"use client";

import { MonthDaysCells } from "@/components/table/month-days-cells";
import { TableBody, TableRow } from "@/components/ui/table";
import { useMonthDays } from "@/hooks/use-month-days";
import {
  FieldArrayWithId,
  UseFieldArrayReturn,
  useFormContext,
} from "react-hook-form";
import { ScheduleType } from "../model/schema";
import { useCallback, useState } from "react";
import ScheduleRowEdit from "./schedule-row-edit";
import type { GetEmployeesData } from "@/features/employee-create/model/schema";

export default function ScheduleBodyEdit({
  fields,
  selectedEmployees,
  remove,
  move,
  update,
  selectedDay,
  setSelectedDay,
}: {
  fields: FieldArrayWithId<ScheduleType, "rowShifts", "id">[];
  selectedEmployees: GetEmployeesData[] | null;
  remove: UseFieldArrayReturn<ScheduleType, "rowShifts", "id">["remove"];
  move: UseFieldArrayReturn<ScheduleType, "rowShifts", "id">["move"];
  update: UseFieldArrayReturn<ScheduleType, "rowShifts", "id">["update"];
  selectedDay: number;
  setSelectedDay: (day: number) => void;
}) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const { getValues } = useFormContext<ScheduleType>();
  const { monthDays } = useMonthDays();

  const handleCellFocus = useCallback(
    (rowIndex: number, dayIndex: number) => {
      setSelectedRow(rowIndex);
      setSelectedDay(dayIndex + 1);
    },
    [setSelectedDay],
  );

  const handleEmployeeChange = useCallback(
    (name: string | null, rowIndex: number) => {
      const employee = selectedEmployees?.find(
        (e) => e.fullName.trim() === name?.trim(),
      );
      if (!employee) return;

      update(rowIndex, {
        ...getValues(`rowShifts.${rowIndex}`),
        employee: employee.fullName,
        role: employee.role,
        rate: employee.currentRate,
        employeeId: employee.id,
      });
    },
    [selectedEmployees, getValues, update],
  );

  return (
    <TableBody>
      {fields.map((row, rowIndex) => {
        return (
          <ScheduleRowEdit
            key={row.id}
            fieldsLength={fields.length}
            row={row}
            rowIndex={rowIndex}
            remove={remove}
            move={move}
            selectedRow={selectedRow}
            selectedEmployees={selectedEmployees}
            onCellFocus={handleCellFocus}
            onEmployeeChange={handleEmployeeChange}
          />
        );
      })}
      {fields.length < 20 && (
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
