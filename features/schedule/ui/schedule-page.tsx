"use client";
import { GetEmployeesData } from "@/features/employee-create/model/schema";
import ScheduleEdit from "./schedule-edit";
import ScheduleView from "./schedule-view";
import { useEdit } from "@/provider/edit-provider";

export function SchedulePage({ employees }: { employees: GetEmployeesData[] }) {
  const { isEditing } = useEdit();

  if (isEditing) {
    return <ScheduleEdit employees={employees} />;
  }

  return <ScheduleView />;
}
