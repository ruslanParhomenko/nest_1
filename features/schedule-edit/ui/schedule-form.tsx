"use client";

import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import ScheduleTable from "../table/schedule-table";
import FormWrapper from "@/components/wrapper/form-wrapper";
import type { GetScheduleData } from "../model/type";
import { useMonthDays } from "@/hooks/use-month-days";
import { createEmptyRowShifts } from "../lib/utils";
import { useScheduleForm } from "../hooks/use-schedule-form";
import { EditMenu } from "@/features/edit-menu/ui/edit-menu";
import { GetEmployeesData } from "@/features/employee-create/model/schema";

export function ScheduleFormEdit({
  employees,
  schedule,
}: {
  employees: GetEmployeesData[];
  schedule: GetScheduleData | null;
}) {
  const { daysCount } = useMonthDays();
  const todayDay = new Date().getDate();

  const [selectedDay, setSelectedDay] = useState<number>(todayDay);

  const { form, onSubmit } = useScheduleForm();

  const { fields, remove, replace, move, update } = useFieldArray({
    control: form.control,
    name: "rowShifts",
  });

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
        rate: "1",
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
  }, [schedule, employees]);
  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <ScheduleTable
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        fields={fields}
        selectedEmployees={employees}
        remove={remove}
        move={move}
        update={update}
        addNewRow={addRow}
      />
    </FormWrapper>
  );
}
