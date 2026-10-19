"use server";

import { fetcher } from "@/lib/api";
import { scheduleSchema, ScheduleType } from "../model/schema";
import { revalidatePath, revalidateTag } from "next/cache";
import { SCHEDULE_ACTION_TAG } from "@/constants/action-tag";

export async function createSchedule(data: {
  year: number;
  month: number;
  role: string;
  rowShifts: ScheduleType["rowShifts"];
}) {
  const parsed = scheduleSchema.safeParse({ rowShifts: data.rowShifts });

  if (!parsed.success) {
    console.error("createSchedule validation:", parsed.error.flatten());
    return { ok: false as const, error: "Validation failed" };
  }

  try {
    const result = await fetcher<{ scheduleId: string; saved: number }>(
      "schedule",
      {
        method: "POST",
        body: JSON.stringify({
          year: data.year,
          month: data.month,
          role: data.role.toUpperCase(),
          rowShifts: parsed.data.rowShifts,
        }),
      },
    );

    revalidateTag(SCHEDULE_ACTION_TAG, "max");
    revalidatePath("/schedules");

    return { ok: true as const, ...result };
  } catch (e) {
    return {
      ok: false as const,
      error: e instanceof Error ? e.message : "API error",
    };
  }
}
