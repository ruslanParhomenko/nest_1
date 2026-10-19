"use server";

import { SCHEDULE_ACTION_TAG } from "@/constants/action-tag";
import { fetcher } from "@/lib/api";
import { cacheLife, cacheTag } from "next/cache";
import { GetScheduleData } from "../../schedule-edit/model/type";

export async function getSchedule(query: {
  year: number;
  month: number;
  role: string;
}) {
  "use cache: remote";

  cacheLife("max");
  cacheTag(SCHEDULE_ACTION_TAG);

  const { year, month, role } = query;

  const schedule = await fetcher<GetScheduleData>(
    `schedule?year=${year}&month=${month}&tab=${role}`,
  );

  return schedule;
}
