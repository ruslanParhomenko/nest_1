import { getMonthDays } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

function parseParam(
  value: string | null,
  fallback: number,
  min: number,
  max: number,
) {
  if (value === null || value.trim() === "") return fallback;
  const n = Number(value);
  return Number.isInteger(n) && n >= min && n <= max ? n : fallback;
}

export function useMonthDays() {
  const searchParams = useSearchParams();

  const now = new Date();

  const month = parseParam(searchParams.get("month"), now.getMonth(), 0, 11);
  const year = parseParam(
    searchParams.get("year"),
    now.getFullYear(),
    1970,
    2100,
  );

  const { monthDays } = getMonthDays({ month, year });

  return {
    month,
    year,
    monthDays,
    daysCount: monthDays.length,
  };
}
