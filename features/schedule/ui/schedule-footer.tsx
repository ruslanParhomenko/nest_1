import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  COLOR_SHIFT,
  SHIFT_OPTIONS,
  SHIFTS,
  TIME_BY_SHIFT,
} from "../../schedule-edit/model/constants";
import { ShiftCounts } from "../../schedule-edit/model/type";

export default function ScheduleTableFooter({
  shiftCounts,
  role,
}: {
  shiftCounts: ShiftCounts | null;
  role: string;
}) {
  return (
    <TableFooter data-html2canvas-ignore="true">
      {SHIFT_OPTIONS.filter((item) =>
        SHIFTS[role as keyof typeof SHIFTS]?.includes(item),
      ).map((item, i) => (
        <TableRow key={i} className="border-0">
          <TableCell
            colSpan={5}
            className="text-muted-foreground px-4 py-1 text-end text-xs"
          >
            {TIME_BY_SHIFT[item as keyof typeof TIME_BY_SHIFT]}
          </TableCell>
          {shiftCounts?.[item]?.map((day, index) => (
            <TableCell
              key={index}
              className={cn(
                "text-muted-foreground py-0 text-center text-xs",
                COLOR_SHIFT[day as keyof typeof COLOR_SHIFT],
              )}
            >
              {day === 0 ? "" : day}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableFooter>
  );
}
