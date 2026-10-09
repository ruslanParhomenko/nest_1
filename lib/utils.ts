export { cn } from "cn";
import { KeyboardEvent } from "react";

export function getFormIdFromPathname(pathname: string): string {
  const mainRoute = pathname.split("/")[1] || "";
  return `${mainRoute}-form`;
}

export const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const getMonthDays = ({
  month,
  year,
}: {
  month: number;
  year: number;
}) => {
  if (!month || month < 0) return { monthDays: [], month: null };

  const daysInMonth = new Date(Number(year), month, 0).getDate();

  const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(Number(year), month - 1, i + 1);

    return {
      day: i + 1,
      weekday: date
        .toLocaleDateString("ru-RU", { weekday: "short" })
        .replace(".", ""),
    };
  });

  return { monthDays, month };
};

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
