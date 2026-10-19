"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import  type { ScheduleType } from "@/features/schedule-edit/model/schema";
import { calculateSalaryByHours, calculateShiftTotals } from "@/features/schedule-edit/lib/utils";

type RowProps = {
    rowIndex: number;
 fieldsLength: number;
  row:  ScheduleType["rowShifts"][number]
};

export default function ScheduleRow({
  rowIndex,
  fieldsLength,
  row,
}: RowProps) {

  const { totalDay, totalNight, total } = calculateShiftTotals(
    row.shifts,
  );

  const totalPay = calculateSalaryByHours({
    ...row,
    dayHours: String(totalDay),
    nightHours: String(totalNight),
  });

  return (
    <TableRow
      className="group hover:text-red-600! [&>td]:py-0.5 [&>td]:text-xs border border-blue-600/30 border-x-0"
    >
          <TableCell
            className="text-red-600 font-bold cursor-pointer border-r text-center"
          >
    
        {rowIndex + 1}
        </TableCell>
      

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
        className="text-center text-green-800"
      >
        {total || 0}
      </TableCell>

      <TableCell className="text-muted-foreground text-center">
        {row.role.charAt(0).toLocaleLowerCase()}-{Number(row.rate) / 1000} :{" "}
        <span
          className="font-bold px-1 text-blue-600"
        >
          {totalPay && totalPay.toFixed()}
        </span>
      </TableCell>
      <TableCell className="bg-background sticky left-0 md:bg-transparent">
{row.employee}      
      </TableCell>

      {row.shifts.map((shiftValue, dayIndex) => {
        return (
          <TableCell
            key={dayIndex}
            className={cn(
              "border-x border-blue-600/30 hover-cell p-0 text-center text-xs",
            )}
          >
          {shiftValue}
          </TableCell>
        );
      })}
      <TableCell className="h-px p-0!">
   
      </TableCell>
    </TableRow>
  );
}

