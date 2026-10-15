"use server";

import { EMPLOYEE_ACTION_TAG } from "@/constants/action-tag";
import { fetcher } from "@/lib/api";
import { cacheLife, cacheTag } from "next/cache";
import { GetEmployeesData } from "../model/schema";

export async function getEmployees() {
  "use cache: remote";

  cacheLife("max");
  cacheTag(EMPLOYEE_ACTION_TAG);

  const requestId = crypto.randomUUID();

  console.log("[getEmployees] EXECUTED", requestId);

  const employees = await fetcher<GetEmployeesData[]>(EMPLOYEE_ACTION_TAG);

  console.log("[getEmployees] API RESPONSE", requestId);

  return employees;
}
