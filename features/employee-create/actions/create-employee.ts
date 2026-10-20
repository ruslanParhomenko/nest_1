"use server";

import { updateTag } from "next/cache";
import { EMPLOYEE_ACTION_TAG } from "@/constants/action-tag";
import { employeesSchema, type EmployeeForm } from "../model/schema";
import { fetcher } from "@/lib/api";

export async function createEmployee(values: EmployeeForm) {
  const parsed = employeesSchema.safeParse(values);

  if (!parsed.success) {
    return { ok: false as const, error: "Validation failed" };
  }

  const { vacation, ...rest } = parsed.data;

  const payload = {
    ...rest,
    employmentDate: rest.employmentDate || null,
    vacation: vacation
      .filter((v) => v.startDate && v.endDate)
      .map(({ startDate, endDate }) => ({ startDate, endDate })),
  };

  try {
    const created = await fetcher<{ id: string }>("employee", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    updateTag(EMPLOYEE_ACTION_TAG);

    return { ok: true as const, data: created };
  } catch (e) {
    return {
      ok: false as const,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}
