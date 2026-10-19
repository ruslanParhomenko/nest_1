import { ArrowRight, Moon, Sun, Sunset } from "lucide-react";
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  COLOR_SHIFT,
  SHIFT_OPTIONS,
  SHIFTS,
  TIME_BY_SHIFT,
} from "../../schedule-edit/model/constants";
import { useFormContext, useWatch } from "react-hook-form";
import { ScheduleType } from "../model/schema";
import { getShiftCounts } from "../lib/utils";
import { useSearchParams } from "next/navigation";

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

export default function ScheduleFooterEdit() {
  const form = useFormContext<ScheduleType>();
  const searchParams = useSearchParams();
  const role = searchParams.get("tab")

  const rowShifts = useWatch({
    control: form.control,
    name: "rowShifts",
  });

  const shiftCounts = getShiftCounts(rowShifts ?? []);

  return (
    <TableFooter data-html2canvas-ignore="true" className="bg-transparent">
      {SHIFT_OPTIONS.filter((item) =>
        SHIFTS[role as keyof typeof SHIFTS]?.includes(item),
      ).map((item) => {
        const Icon = getShiftIcon(String(item));

        return (
          <TableRow key={item} className="border-0">
            <TableCell
              colSpan={5}
              className={cn(
                "px-6 text-end text-xs",
                rowShifts.length < 20 ? "py-0.5" : "py-0",
              )}
            >
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
