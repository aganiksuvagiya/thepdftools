import lastUpdatedData from "./last-updated.json";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getLastUpdated(relativePath: string) {
  const date =
    (lastUpdatedData as Record<string, string>)[relativePath] ??
    new Date().toISOString().slice(0, 10);
  const [year, month, day] = date.split("-").map(Number);
  return { date, formatted: `${MONTHS[month - 1]} ${day}, ${year}` };
}
