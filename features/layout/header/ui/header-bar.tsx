import SelectMonthYear from "./month-year-select";
import RoleTabs from "./role-tabs";
import NavLink from "./nav-link";

export default function HeaderBar() {
  return (
    <div className="bg-background sticky top-0 z-9 flex flex-row items-center justify-between gap-1 py-1 md:gap-2 md:px-4">
      <RoleTabs />
      <NavLink />
      <SelectMonthYear />
    </div>
  );
}
