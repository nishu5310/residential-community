/**
 * Date Utility Functions for Residential Community Platform
 * Dynamically computes relative and absolute dates based on the system date.
 */

export function getTodayDate(): Date {
  return new Date();
}

/**
 * Formats a Date object into a readable string format (e.g. "12 Aug 2026")
 */
export function formatFullDate(dateStrOrObj: Date | string): string {
  const date = typeof dateStrOrObj === "string" ? new Date(dateStrOrObj) : dateStrOrObj;
  if (isNaN(date.getTime())) return String(dateStrOrObj);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Returns dynamic relative date string with actual date attached.
 * Example for target date of tomorrow: "Tomorrow · 13 Aug 2026"
 * Example for target date of today: "Today · 12 Aug 2026"
 */
export function getFormattedRelativeDate(daysOffset: number = 1): string {
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + daysOffset);

  const dateFormatted = formatFullDate(targetDate);

  if (daysOffset === 0) {
    return `Today · ${dateFormatted}`;
  } else if (daysOffset === 1) {
    return `Tomorrow · ${dateFormatted}`;
  } else if (daysOffset === -1) {
    return `Yesterday · ${dateFormatted}`;
  }

  return dateFormatted;
}

/**
 * Gets a future date formatted string given days from today
 */
export function getFutureDateString(daysFromToday: number): string {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysFromToday);
  return formatFullDate(targetDate);
}

/**
 * Formats full timestamp (e.g. "12 Aug 2026 · 08:30 PM")
 */
export function formatFullTimestamp(dateObj?: Date): string {
  const d = dateObj || new Date();
  const dateFormatted = formatFullDate(d);
  const timeFormatted = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${dateFormatted} · ${timeFormatted}`;
}
