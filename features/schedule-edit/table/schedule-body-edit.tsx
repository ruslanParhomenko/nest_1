"use client";

import { MonthDaysCells } from "@/components/table/month-days-cells";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useMonthDays } from "@/hooks/use-month-days";
import {
  FieldArrayWithId,
  UseFieldArrayReturn,
  useFormContext,
  useWatch,
} from "react-hook-form";

import { ScheduleType } from "../model/schema";
import { Employee } from "@/bd-test/employee";
import {
  calculateSalaryByHours,
  calculateShiftTotals,
  handleMultiTableNavigation,
} from "../lib/utils";
import { color, SHIFT_COLOR_MAP } from "../model/constants";
import MoveButton from "@/components/action-buttons/move-button";
import SelectField from "@/components/form-select/select-field";
import { useState } from "react";

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
  selectedEmployees: Employee[];
  remove: UseFieldArrayReturn<ScheduleType, "rowShifts", "id">["remove"];
  move: UseFieldArrayReturn<ScheduleType, "rowShifts", "id">["move"];
  update: UseFieldArrayReturn<ScheduleType, "rowShifts", "id">["update"];
  selectedDay: number;
  setSelectedDay: (day: number) => void;
}) {
  const [movedId, setMovedId] = useState<string | null>(null);

  const form = useFormContext<ScheduleType>();
  const { control, getValues } = form;

  const employeesLength = fields?.length || 0;

  const { monthDays } = useMonthDays();

  const shifts = useWatch({
    control: control,
    name: "rowShifts",
  });

  function handleEmployeeChange(selectedName: string, rowIndex: number) {
    const employee = selectedEmployees.find(
      (e) => e.fullName.trim() === selectedName.trim(),
    );
    if (!employee) return;

    update(rowIndex, {
      ...getValues(`rowShifts.${rowIndex}`),
      employee: employee.fullName,
      role: employee.role,
      rate: employee.rate,
      employeeId: employee.id,
    });
  }

  return (
    <TableBody>
      {fields.map((row, rowIndex) => {
        const rowShifts = shifts[rowIndex] || [];
        const { totalDay, totalNight, total } = calculateShiftTotals(
          rowShifts.shifts,
        );

        const rate = getValues(`rowShifts.${rowIndex}.rate`);
        const totalPay = calculateSalaryByHours({
          ...rowShifts,
          dayHours: String(totalDay),
          nightHours: String(totalNight),
        });

        const isSelected = !SHIFT_COLOR_MAP.includes(
          row.shifts?.[Number(selectedDay) - 1],
        );
        return (
          <TableRow
            key={row.id}
            className="group hover:text-green-600! [&>td]:py-0.5 [&>td]:text-xs border border-blue-600/30 border-x-0"
          >
            <TableCell
              className="text-rd cursor-pointer"
              onClick={() => remove(rowIndex)}
            >
              {rowIndex + 1}
            </TableCell>

            <TableCell className="text-blue-500 hover-cell px-0">
              {totalDay || 0}
            </TableCell>
            <TableCell className="text-blue-500 hover-cell px-0">
              {totalNight || 0}
            </TableCell>

            <TableCell className="px-0">{total || 0}</TableCell>

            <TableCell className="px-2">
              {totalPay && totalPay.toFixed()}
            </TableCell>
            <TableCell className="text-muted-foreground px-2! text-right">
              {row.role.charAt(0)}
              {Number(rate) / 1000}
            </TableCell>
            <TableCell className="bg-background sticky left-0 pl-2! md:bg-transparent">
              <SelectField
                fieldName={`rowShifts.${rowIndex}.employee`}
                data={selectedEmployees.map((e) => e.fullName)}
                className={cn(
                  "hover-cell truncate p-0 text-xs",
                  isSelected && "text-rd font-bold",
                  employeesLength < 18 ? "h-8" : "h-7!",
                )}
                onChange={(name) => handleEmployeeChange(name, rowIndex)}
              />
            </TableCell>

            {row.shifts.map((shiftValue, dayIndex) => {
              const isSelected = dayIndex === selectedDay - 1;
              return (
                <TableCell
                  key={dayIndex}
                  className={cn(
                    "border-x border-blue-600/30 hover-cell p-0 text-center text-xs",
                    isSelected && "text-red-600 font-bold",
                  )}
                >
                  <input
                    {...form.register(
                      `rowShifts.${rowIndex}.shifts.${dayIndex}`,
                    )}
                    data-row={rowIndex}
                    data-col={dayIndex}
                    onKeyDown={handleMultiTableNavigation}
                    className={cn(
                      "hover-cell h-full w-full text-center text-sm",
                      shiftValue === "" ? "bg-border/20" : "",
                      color[shiftValue as keyof typeof color],
                      employeesLength < 18 ? "h-8" : "h-7!",
                    )}
                    onFocus={() => setSelectedDay(dayIndex + 1)}
                  />
                </TableCell>
              );
            })}
            <TableCell className="h-px p-0!">
              <MoveButton
                rowIndex={rowIndex}
                fields={fields}
                move={move}
                active={movedId === row.id}
                onMoved={() => setMovedId(row.id)}
              />
            </TableCell>
          </TableRow>
        );
      })}
      <TableRow>
        <MonthDaysCells
          monthDays={monthDays}
          selectedDay={selectedDay}
          orientation="bottom"
          colSpan={7}
          className="h-9"
        />
      </TableRow>
    </TableBody>
  );
}
