"use client";

import { useIsMobile } from "@/hooks/use-mobile";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import SelectMonthYear from "./month-year-select";
import RoleTabs from "./role-tabs";

export default function HeaderBar() {
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  const urlMonth = searchParams.get("month");
  const urlYear = searchParams.get("year");
  const urlTab = searchParams.get("tab");

  const showTabs = urlTab && !isMobile;
  const showMonthYear = urlMonth && urlYear;

  return (
    <div
      className={cn(
        "bg-background sticky top-0 z-9 flex flex-row items-center justify-between gap-1 py-1 md:gap-2 md:px-4",
      )}
    >
      {showTabs && <RoleTabs urlTab={urlTab} />}
      {showMonthYear && (
        <SelectMonthYear urlMonth={urlMonth} urlYear={urlYear} />
      )}
    </div>
  );
}
