import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  COLOR_SHIFT,
  SHIFT_OPTIONS,
  SHIFTS,
  TIME_BY_SHIFT,
} from "../../schedule-edit/model/constants";
import { ShiftCounts } from "../../schedule-edit/model/type";
import { ArrowRight, Moon, Sun, Sunset } from "lucide-react";

const SHIFT_ICONS = {
  day: Sun,
  evening: Sunset,
  night: Moon,
} as const;

function getShiftIcon(shift: string) {
  const startHour = Number.parseInt(shift, 10);

  if (startHour >= 18 || startHour < 6) return SHIFT_ICONS.night;
  if (startHour >= 12) return SHIFT_ICONS.evening;

  return SHIFT_ICONS.day;
}

export default function ScheduleTableFooter({
  shiftCounts,
  role,
}: {
  shiftCounts: ShiftCounts | null;
  role: string;
}) {
  return (
    <TableFooter
      data-html2canvas-ignore="true"
      className="bg-transparent border-0"
    >
      {SHIFT_OPTIONS.filter((item) =>
        SHIFTS[role as keyof typeof SHIFTS]?.includes(item),
      ).map((item, i) => {
        const Icon = getShiftIcon(String(item));

        return (
          <TableRow key={item} className="border-0">
            <TableCell colSpan={5} className="pr-10 text-end text-xs py-0.5">
              <span className="inline-flex items-center justify-center gap-2 text-muted-foreground">
                <Icon className="size-3 shrink-0" aria-hidden="true" />

                <span className="min-w-10 text-center font-medium">
                  {TIME_BY_SHIFT[item as keyof typeof TIME_BY_SHIFT]
                    .split("–")[0]
                    .trim()}
                </span>

                <ArrowRight
                  className="size-3 shrink-0 opacity-60"
                  aria-hidden="true"
                />

                <span className="min-w-10 text-center font-medium">
                  {TIME_BY_SHIFT[item as keyof typeof TIME_BY_SHIFT]
                    .split("–")[1]
                    .trim()}
                </span>
              </span>
            </TableCell>

            {shiftCounts?.[item]?.map((day, index) => (
              <TableCell
                key={index}
                className={cn(
                  "py-0 text-center text-xs text-muted-foreground",
                  COLOR_SHIFT[day as keyof typeof COLOR_SHIFT],
                )}
              >
                {day === 0 ? "" : day}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </TableFooter>
  );
}
