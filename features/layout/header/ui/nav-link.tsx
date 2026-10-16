"use client";

import {
  EMPLOYEES_MAIN_ROUTE,
  SCHEDULE_MAIN_ROUTE,
} from "@/constants/main-route";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const NAV_PATCH_ITEMS = [SCHEDULE_MAIN_ROUTE, EMPLOYEES_MAIN_ROUTE] as const;

export default function NavLink() {
  const patchName = usePathname().split("/")[1];

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const month = searchParams.get("month")
  const year = searchParams.get("year");


  console.log(tab);

  const URL_BY_NAV = {
    schedule: `/${SCHEDULE_MAIN_ROUTE}?tab=${tab}&&month=${month}&year=${year}`,
    employees: `/${EMPLOYEES_MAIN_ROUTE}?tab=${tab}&month=${month}&year=${year}`,
  };

  if (!patchName || tab === "form") return null;

  return (
    <div className="flex items-center justify-center gap-6 py-2">
      {NAV_PATCH_ITEMS.map((item) => {
        const isActive = item === patchName;
        return (
          <Link
            key={item}
            href={URL_BY_NAV[item as keyof typeof URL_BY_NAV]}
            className={cn(
              "border-b-2 border-transparent pb-1 text-sm text-muted-foreground hover:text-foreground tracking-wider font-bold",
              isActive && "border-red-600 text-red-600 hover:text-red-600",
            )}
          >
            {item}
          </Link>
        );
      })}
    </div>
  );
}
