"use client";

import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";

import ScheduleTable from "../table/schedule-table";
import FormWrapper from "@/components/wrapper/form-wrapper";
import { GetScheduleData } from "../model/type";
import { Employee } from "@/bd-test/employee";
import { useMonthDays } from "@/hooks/use-month-days";
import { createEmptyRowShifts, getShiftCounts } from "../lib/utils";
import { useScheduleForm } from "../hooks/use-schedule-form";
import { EditMenu } from "@/features/edit-menu/ui/edit-menu";

export function ScheduleFormEdit({
  employees,
  schedule,
  tab,
}: {
  employees: Employee[];
  schedule: GetScheduleData | null;
  tab: string;
}) {
  const { daysCount } = useMonthDays();

  const todayDay = new Date().getDate();

  const [selectedDay, setSelectedDay] = useState<number>(todayDay);

  const { form, onSubmit } = useScheduleForm(tab);

  const { fields, remove, replace, move, update } = useFieldArray({
    control: form.control,
    name: "rowShifts",
  });

  const rowShifts = form.watch("rowShifts");

  const shiftCounts = getShiftCounts(rowShifts ?? []);

  function addRow() {
    replace([
      ...fields,
      {
        id: (fields.length + 1).toString(),
        dayHours: "",
        nightHours: "",
        totalHours: "",
        employee: "",
        salary: "",
        role: "",
        rate: 0,
        employeeId: "",
        shifts: Array(daysCount).fill(""),
      },
    ]);
  }

  useEffect(() => {
    if (schedule) {
      form.reset(schedule);
      return;
    }

    replace(createEmptyRowShifts(employees, daysCount));
  }, [schedule]);
  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <EditMenu addNewRow={addRow} />
      <ScheduleTable
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        fields={fields}
        selectedEmployees={employees}
        remove={remove}
        move={move}
        update={update}
        shiftCounts={shiftCounts}
        tab={tab}
      />
    </FormWrapper>
  );
}
