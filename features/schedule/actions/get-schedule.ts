"use server";

import { SCHEDULE_ACTION_TAG } from "@/constants/action-tag";
import { fetcher } from "@/lib/api";
import { cacheLife, cacheTag } from "next/cache";

const tag = SCHEDULE_ACTION_TAG;

export async function getSchedule() {
  "use cache";

  cacheLife("max");
  cacheTag(tag);

  return fetcher(tag);
}
