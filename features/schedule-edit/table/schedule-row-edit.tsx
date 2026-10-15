"use client";
import {
  FieldArrayWithId,
  UseFieldArrayReturn,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { ScheduleType } from "../model/schema";
import { TableCell, TableRow } from "@/components/ui/table";
import SelectField from "@/components/form-select/select-field";
import MoveButton from "@/components/action-buttons/move-button";
import { cn } from "@/lib/utils";

import {
  calculateSalaryByHours,
  calculateShiftTotals,
  handleMultiTableNavigation,
} from "../lib/utils";
import { color } from "../model/constants";
import { memo, useState } from "react";
import AppTooltip from "@/components/ui/app-tooltip";
import type { GetEmployeesData } from "@/features/employee-create/model/schema";

type RowProps = {
  row: FieldArrayWithId<ScheduleType, "rowShifts", "id">;
  rowIndex: number;
  fieldsLength: number;
  remove: UseFieldArrayReturn<ScheduleType, "rowShifts", "id">["remove"];
  move: UseFieldArrayReturn<ScheduleType, "rowShifts", "id">["move"];
  selectedRow: number | null;
  selectedEmployees: GetEmployeesData[];

  onCellFocus: (rowIndex: number, dayIndex: number) => void;
  onEmployeeChange: (name: string | null, rowIndex: number) => void;
};

function ScheduleRowEdit({
  row,
  rowIndex,
  fieldsLength,
  remove,
  move,
  selectedRow,
  selectedEmployees,

  onCellFocus,
  onEmployeeChange,
}: RowProps) {
  const { control, register } = useFormContext<ScheduleType>();

  const [movedId, setMovedId] = useState<string | null>(null);

  const rowShifts = useWatch({
    control: control,
    name: `rowShifts.${rowIndex}`,
  });

  const { totalDay, totalNight, total } = calculateShiftTotals(
    rowShifts.shifts,
  );

  const totalPay = calculateSalaryByHours({
    ...rowShifts,
    dayHours: String(totalDay),
    nightHours: String(totalNight),
  });

  return (
    <TableRow
      key={row.id}
      className="group hover:text-red-600! [&>td]:py-0 [&>td]:text-xs border border-blue-600/30 border-x-0"
    >
      <AppTooltip
        content="Удалить строку"
        render={
          <TableCell
            className="text-red-600 font-bold cursor-pointer border-r text-center"
            onClick={() => remove(rowIndex)}
          />
        }
      >
        {rowIndex + 1}
      </AppTooltip>

      <TableCell className="text-blue-500 hover-cell">
        {fieldsLength > 22 ? (
          <div className="flex items-center justify-center gap-1 text-[11px] leading-none">
            <span>{totalDay || 0}</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{totalNight || 0}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center leading-tight">
            <span className="text-[11px]">{totalDay || 0}</span>
            <span className="w-full border-t text-center text-muted-foreground text-[11px]">
              {totalNight || 0}
            </span>
          </div>
        )}
      </TableCell>

      <TableCell
        className={cn(
          selectedRow === rowIndex ? "text-red-600" : "text-green-800",
          "text-center",
        )}
      >
        {total || 0}
      </TableCell>

      <TableCell className="text-muted-foreground text-center">
        {row.role.charAt(0).toLocaleLowerCase()}-{Number(row.rate) / 1000} :{" "}
        <span
          className={cn(
            selectedRow === rowIndex ? "text-red-600" : "text-blue-600",
            "font-bold px-1",
          )}
        >
          {totalPay && totalPay.toFixed()}
        </span>
      </TableCell>
      <TableCell className="bg-background sticky left-0 md:bg-transparent">
        <SelectField
          fieldName={`rowShifts.${rowIndex}.employee`}
          data={selectedEmployees.map((e) => e.fullName)}
          className={cn(
            "hover-cell truncate text-xs h-5!",
            selectedRow === rowIndex && "text-red-600! font-bold",
          )}
          onChange={(name) => onEmployeeChange(name, rowIndex)}
          withOutBorder={true}
        />
      </TableCell>

      {row.shifts.map((shiftValue, dayIndex) => {
        return (
          <TableCell
            key={dayIndex}
            className={cn(
              "border-x border-blue-600/30 hover-cell p-0 text-center text-xs",
            )}
          >
            <input
              {...register(`rowShifts.${rowIndex}.shifts.${dayIndex}`)}
              data-row={rowIndex}
              data-col={dayIndex}
              onKeyDown={handleMultiTableNavigation}
              className={cn(
                "hover-cell  w-full text-center text-sm",
                fieldsLength > 20 ? "h-5" : "h-8",
                shiftValue === "" ? "bg-border/20" : "",
                color[shiftValue as keyof typeof color],
              )}
              onFocus={() => onCellFocus(rowIndex, dayIndex)}
            />
          </TableCell>
        );
      })}
      <TableCell className="h-px p-0!">
        <MoveButton
          rowIndex={rowIndex}
          move={move}
          active={movedId === row.id}
          onMoved={() => setMovedId(row.id)}
          isBottom={rowIndex === fieldsLength - 1}
          isTop={rowIndex === 0}
        />
      </TableCell>
    </TableRow>
  );
}

export default memo(ScheduleRowEdit);
