/** "2026-03-12" -> "March 12, 2026", pinned to UTC so server and client render the same text. */
export function formatPostDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
