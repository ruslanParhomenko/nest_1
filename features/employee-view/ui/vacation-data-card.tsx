import { formatDate } from "@/utils/get-format-date";
import { differenceInCalendarDays } from "date-fns";
import { CalendarDays } from "lucide-react";

export default function VacationDataCard({
    index,
    vacation,
}: {
    index: number;
    vacation: {
        startDate: string;
        endDate: string;
    };
}) {

     const days =
                    vacation.startDate &&
                    vacation.endDate &&
                    vacation.endDate >= vacation.startDate
                      ? differenceInCalendarDays(vacation.endDate, vacation.startDate) + 1
                      : null;
    return (

          <div                   className="group/vacation grid min-w-0 grid-cols-[30%_auto_10%] items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-2.5 transition-colors duration-200 hover:border-primary/20 hover:bg-muted/50"
                >

            <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background shadow-sm">
                        <CalendarDays className="size-4 text-muted-foreground" />
                      </div>

                      <span className="truncate text-sm font-medium">
                        Отпуск {index + 1}
                      </span>
                    </div>
                    </div>
                                <div className="wrap-break-word justify-center gap-12 pr-4 text-md font-semibold tracking-tight flex-1  flex">

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Начало
                        </p>
                        <p className="wrap-break-word text-sm font-medium">
                          {formatDate(vacation.startDate)}
                        </p>
                      </div>

                      <div className="">
                        <p className="text-xs text-muted-foreground">
                          Окончание
                        </p>
                        <p className="wrap-break-word text-sm font-medium">
                          {formatDate(vacation.endDate)}
                        </p>
                      </div>
                      </div>

                  <div className="flex min-w-18  items-center justify-center gap-1 rounded-xl bg-primary/[0.07] px-4 py-2">

                    <span className="text-xl font-semibold tabular-nums tracking-tight">
                      {days ?? "—"}
                    </span>

                    <span className="text-[11px] text-muted-foreground">
                      {days === null
                        ? "дней"
                        : days === 1
                          ? "день"
                          : days >= 2 && days <= 4
                            ? "дня"
                            : "дней"}
                    </span>
                  </div>
                </div>
    )
}