"use client";

import { useState } from "react";
import ScheduleEdit from "./schedule-edit";
import ScheduleView from "./schedule-view";
import { useEdit } from "@/provider/edit-provider";

export function SchedulePage() {
  const { isEditing } = useEdit();

  if (isEditing) {
    return <ScheduleEdit />;
  }

  return <ScheduleView />;
}
