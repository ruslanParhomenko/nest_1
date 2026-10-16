"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import SelectMonthYear from "./month-year-select";
import RoleTabs from "./role-tabs";
import NavLink from "./nav-link";

export default function HeaderBar() {
  const searchParams = useSearchParams();

  const urlMonth = searchParams.get("month");
  const urlYear = searchParams.get("year");
  const urlTab = searchParams.get("tab");

  const showTabs = urlTab;
  const showMonthYear = urlMonth && urlYear;

  return (
    <div
      className={cn(
        "bg-background sticky top-0 z-9 flex flex-row items-center justify-between gap-1 py-1 md:gap-2 md:px-4",
      )}
    >
      {showTabs && <RoleTabs urlTab={urlTab} />}
                <NavLink />
      
      {showMonthYear && (
        <SelectMonthYear urlMonth={urlMonth} urlYear={urlYear} />
      )}
    </div>
  );
}
