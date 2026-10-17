import SelectMonthYear from "./month-year-select";
import RoleTabs from "./role-tabs";
import NavLink from "./nav-link";

export default function HeaderBar() {
  return (
    <div className="bg-background sticky top-0 z-9 grid w-full grid-cols-3 items-center gap-1 py-1  md:gap-2 md:px-6">
      <RoleTabs />
      <NavLink />
      <SelectMonthYear />
    </div>
  );
}
