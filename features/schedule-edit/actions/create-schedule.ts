"use server";

import { fetcher, getActor } from "@/lib/api";
import { scheduleSchema, ScheduleType } from "../model/schema";
import { updateTag } from "next/cache";
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
    const actor = await getActor();

    const result = await fetcher<{ scheduleId: string; saved: number }>(
      "schedule",
      actor,
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

    updateTag(SCHEDULE_ACTION_TAG);
    return { ok: true as const, id: result?.scheduleId };
  } catch (e) {
    return {
      ok: false as const,
      error: e instanceof Error ? e.message : "API error",
    };
  }
}
