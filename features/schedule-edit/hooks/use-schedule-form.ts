"use client";
import { useMonthDays } from "@/hooks/use-month-days";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { calculateSalaryByHours, calculateShiftTotals } from "../lib/utils";
import { EMPLOYEE_ROLES_BY_DEPARTMENT } from "../model/constants";
import { defaultSchedule, scheduleSchema, ScheduleType } from "../model/schema";
import { useEdit } from "@/provider/edit-provider";
import { useRouter, useSearchParams } from "next/navigation";
import { createSchedule } from "../actions/create-schedule";

export function useScheduleForm() {
  const { month, year } = useMonthDays();

  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const { setIsEditing: setIsEdit } = useEdit();

  const form = useForm<ScheduleType>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: defaultSchedule,
  });

  const onSubmit: SubmitHandler<ScheduleType> = async (data) => {
    const rowShiftsWithHours = data.rowShifts.map((row) => {
      if (!row.shifts) return row;
      const { totalDay, totalNight, total } = calculateShiftTotals(row.shifts);

      const totalPay = calculateSalaryByHours({
        ...row,
        dayHours: totalDay.toString(),
        nightHours: totalNight.toString(),
        totalHours: total.toString(),
      });

      return {
        ...row,
        dayHours: totalDay.toString(),
        nightHours: totalNight.toString(),
        totalHours: total.toString(),
        salary: totalPay.toFixed(0).toString(),
      };
    });

    const res = await createSchedule({
      year,
      month,
      role: tab as keyof typeof EMPLOYEE_ROLES_BY_DEPARTMENT,
      rowShifts: rowShiftsWithHours,
    });

    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("График успешно создан!");

    setIsEdit(false);

    form.reset();

    router.back();
  };

  return {
    form,
    onSubmit,
  };
}
