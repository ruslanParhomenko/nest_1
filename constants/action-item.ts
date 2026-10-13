import { EMPLOYEE_MAIN_ROUTE, EMPLOYEES_MAIN_ROUTE, SCHEDULE_MAIN_ROUTE } from "./main-route";

export const ACTION_ITEM_BY_ROUTE = {
  [SCHEDULE_MAIN_ROUTE]: ["edit", "save"],
  [EMPLOYEES_MAIN_ROUTE]: ["add-employee", "save"],
  [EMPLOYEE_MAIN_ROUTE]: ["edit", "save"],
};
