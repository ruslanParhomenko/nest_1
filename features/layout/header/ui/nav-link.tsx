"use client";

import {
  EMPLOYEES_MAIN_ROUTE,
  SCHEDULES_MAIN_ROUTE,
} from "@/constants/main-route";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavLink() {
  const pathname = usePathname();
  const patchName = pathname.split("/")[1];

  const searchParams = useSearchParams();

  const navItems = [
    {
      label: SCHEDULES_MAIN_ROUTE,
      href: `/${SCHEDULES_MAIN_ROUTE}`,
    },
    {
      label: EMPLOYEES_MAIN_ROUTE,
      href: `/${EMPLOYEES_MAIN_ROUTE}`,
    },
  ] as const;

  if (!patchName) {
    return <div className="flex items-center justify-center gap-6 py-2"></div>;
  }

  return (
    <div className="flex items-center justify-center gap-6 py-2">
      {navItems.map((item) => {
        const isActive = item.href === `/${patchName}`;

        const query = searchParams.toString();

        return (
          <Link
            key={item.href}
            href={`${item.href}?${query}`}
            className={cn(
              "border-b-2 border-transparent pb-1 text-sm font-bold tracking-wider text-muted-foreground hover:text-foreground",
              isActive && "text-red-600 hover:text-red-600",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
