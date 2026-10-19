"use client";
import SelectMonthYear from "./month-year-select";
import RoleTabs from "./role-tabs";
import NavLink from "./nav-link";
import { usePathname } from "next/navigation";

export default function HeaderBar() {
  const pathname = usePathname();
  const patchName = pathname.split("/")[1];
  return (
    <div className="bg-background sticky top-0 z-9 grid w-full grid-cols-3 items-center  gap-1 py-1  md:gap-2 md:px-6">
      <RoleTabs />
      {patchName !== "home" ? <NavLink /> : <div></div>}
      <SelectMonthYear />
    </div>
  );
}
