import { EMPLOYEE_ACTION_TAG } from "@/constants/action-tag";
import { fetcher } from "@/lib/api";
import { cacheLife, cacheTag } from "next/cache";
import { GetEmployeesData } from "../model/schema";

const tag = EMPLOYEE_ACTION_TAG;

export async function getEmployees() {
  "use cache";

  cacheLife("max");
  cacheTag(tag);

  return fetcher<GetEmployeesData[]>(tag);
}
