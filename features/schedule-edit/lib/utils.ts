import type { GetEmployeesData } from "@/features/employee-create/model/schema";
import {
  SHIFT_HOURS_MAP_DAY,
  SHIFT_HOURS_MAP_NIGHT,
  SHIFT_OPTIONS,
} from "../model/constants";
import { ScheduleType } from "../model/schema";
import { ShiftCounts } from "../model/type";
import { KeyboardEvent } from "react";

export function getShiftCounts(
  rowShifts: ScheduleType["rowShifts"],
): ShiftCounts | null {
  if (!rowShifts?.length) return null;

  const daysCount = rowShifts[0]?.shifts?.length || 0;

  const result = Object.fromEntries(
    SHIFT_OPTIONS.map((s) => [s, Array(daysCount).fill(0)]),
  );

  rowShifts.forEach((row) => {
    row.shifts.forEach((shiftValue, dayIndex) => {
      const parts = shiftValue.split(".");
      const matchedPart = parts.find((part) => SHIFT_OPTIONS.includes(part));
      if (matchedPart) {
        result[matchedPart][dayIndex] += 1;
      }
    });
  });

  const hasData = Object.values(result).some((arr) =>
    arr.some((value) => value > 0),
  );

  return hasData ? result : null;
}

export function calculateSalaryByHours(row: ScheduleType["rowShifts"][number]) {
  const rate = Number(row.rate);
  const dayHours = Number(row.dayHours);
  const nightHours = Number(row.nightHours);

  const safeRate = Number.isFinite(rate) ? rate : 0;
  const safeDay = Number.isFinite(dayHours) ? dayHours : 0;
  const safeNight = Number.isFinite(nightHours) ? nightHours : 0;

  const base = safeRate / 186;
  const dayHourPay = row.role === "mngr" ? base : base * 0.9;
  const nightHourPay = row.role === "mngr" ? base : base * 1.15;

  return dayHourPay * safeDay + nightHourPay * safeNight;
}

export function calculateShiftTotals(shifts: string[]) {
  const dayHours = (shifts || []).reduce(
    (sum, val) => sum + (SHIFT_HOURS_MAP_DAY[val] ?? 0),
    0,
  );
  const nightHours = (shifts || []).reduce(
    (sum, val) => sum + (SHIFT_HOURS_MAP_NIGHT[val] ?? 0),
    0,
  );
  const total = dayHours + nightHours;

  return { totalDay: dayHours, totalNight: nightHours, total };
}

export function createEmptyRowShifts(
  employees: GetEmployeesData[],
  daysCount: number,
) {
  return employees.map((emp, index) => ({
    id: index.toString(),
    dayHours: "",
    nightHours: "",
    totalHours: "",
    salary: "",
    employee: emp.fullName,
    role: emp.role,
    rate: emp.currentRate,
    employeeId: emp.id,
    shifts: Array(daysCount).fill(""),
  }));
}

export function handleMultiTableNavigation(e: KeyboardEvent<HTMLInputElement>) {
  const key = e.key;
  const input = e.currentTarget;

  const td = input.closest("td");
  const tr = input.closest("tr");
  const tbody = input.closest("tbody");

  if (!td || !tr || !tbody) return;

  if (key === "Tab") {
    e.preventDefault();

    const nextTbody = e.shiftKey
      ? (tbody.previousElementSibling as HTMLElement | null)
      : (tbody.nextElementSibling as HTMLElement | null);

    const target =
      nextTbody?.querySelector<HTMLInputElement>("input:not(:disabled)") ??
      null;

    target?.focus();
    return;
  }

  if (
    !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].includes(key)
  ) {
    return;
  }

  e.preventDefault();

  const colIndex = td.cellIndex;

  let target: HTMLInputElement | null = null;

  const inputsInCell = td.querySelectorAll<HTMLInputElement>("input");
  const currentIndex = Array.from(inputsInCell).indexOf(input);

  switch (key) {
    case "ArrowRight":
    case "Enter":
      target =
        td.nextElementSibling?.querySelector<HTMLInputElement>(
          "input:not(:disabled)",
        ) ?? null;
      break;

    case "ArrowLeft":
      target =
        td.previousElementSibling?.querySelector<HTMLInputElement>(
          "input:not(:disabled)",
        ) ?? null;
      break;

    case "ArrowDown":
      if (inputsInCell.length > 1 && currentIndex < inputsInCell.length - 1) {
        target = inputsInCell[currentIndex + 1];
        break;
      }
      target =
        tr.nextElementSibling?.querySelector<HTMLInputElement>(
          `td:nth-child(${colIndex + 1}) input:not(:disabled)`,
        ) ?? null;
      break;

    case "ArrowUp":
      if (inputsInCell.length > 1 && currentIndex > 0) {
        target = inputsInCell[currentIndex - 1];
        break;
      }

      target =
        tr.previousElementSibling?.querySelector<HTMLInputElement>(
          `td:nth-child(${colIndex + 1}) input:not(:disabled)`,
        ) ?? null;
      break;
  }

  target?.focus();
}
