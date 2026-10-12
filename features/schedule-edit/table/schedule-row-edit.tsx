"use client";
import {
  FieldArrayWithId,
  UseFieldArrayReturn,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { ScheduleType } from "../model/schema";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SelectField from "@/components/form-select/select-field";
import MoveButton from "@/components/action-buttons/move-button";
import { cn } from "@/lib/utils";
import { Employee } from "@/bd-test/employee";
import {
  calculateSalaryByHours,
  calculateShiftTotals,
  handleMultiTableNavigation,
} from "../lib/utils";
import { color } from "../model/constants";
import { memo, useState } from "react";

type RowProps = {
  row: FieldArrayWithId<ScheduleType, "rowShifts", "id">;
  rowIndex: number;
  fieldsLength: number;
  remove: UseFieldArrayReturn<ScheduleType, "rowShifts", "id">["remove"];
  move: UseFieldArrayReturn<ScheduleType, "rowShifts", "id">["move"];
  selectedRow: number | null;
  selectedEmployees: Employee[];

  onCellFocus: (rowIndex: number, dayIndex: number) => void;
  onEmployeeChange: (name: string, rowIndex: number) => void;
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
      className="group hover:text-red-600! [&>td]:py-0.5 [&>td]:text-xs border border-blue-600/30 border-x-0"
    >
      <Tooltip>
        <TooltipTrigger
          render={
            <TableCell
              className="text-red-600 font-bold cursor-pointer border-r text-center"
              onClick={() => remove(rowIndex)}
            />
          }
        >
          {rowIndex + 1}
        </TooltipTrigger>
        <TooltipContent>Удалить строку</TooltipContent>
      </Tooltip>

      <TableCell className="text-blue-500 hover-cell">
        <div className="flex flex-col items-center leading-tight">
          <span className="text-[11px]">{totalDay || 0}</span>
          <span className="mt-px w-full border-t pt-px text-center text-muted-foreground text-[11px]">
            {totalNight || 0}
          </span>
        </div>
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
            "hover-cell truncate p-0 text-xs",
            selectedRow === rowIndex && "text-red-600! font-bold",
          )}
          onChange={(name) => onEmployeeChange(name, rowIndex)}
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
                "hover-cell  w-full text-center text-sm h-8",
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
