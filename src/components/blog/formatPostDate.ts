/** "2026-03-12" -> "March 12, 2026", pinned to UTC so server and client render the same text. */
export function formatPostDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "2026-03-12" -> "03/12/2026" (the "Blog info" card), pinned to UTC like formatPostDate. */
export function formatPostDateShort(isoDate: string) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}
