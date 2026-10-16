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

export const YEARS = ["2026", "2027", "2028", "2029", "2030"];

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
