"use client";

import { format, isValid, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

export function formatShortDate(date: string | Date) {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);

  return `${day}.${month}.${year}`;
}

export function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null;

  const date = parseISO(value);

  return isValid(date) ? date : null;
}


export function formatDate(value: string | null | undefined): string {
  const date = parseDate(value);

  return date
    ? format(date, "d MMM yyyy", { locale: ru })
    : "—";
}
