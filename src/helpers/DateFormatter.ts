import {format, isSameDay, isSameYear} from "date-fns"

export const formatDatetime = (date?: Date, locale?: string) =>
  date?.toLocaleString(locale, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }) ?? "-"

export const formatDate = (date?: Date, locale?: string) =>
  date?.toLocaleString(locale, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })

export const formatRelativeDatetime = (date?: Date, referenceDate?: Date, locale?: string) => {
  if (!referenceDate) {
    return formatDatetime(date, locale)
  }
  return date?.toLocaleString(locale, {
    weekday: undefined,
    year: isSameYear(referenceDate, date) ? undefined : "2-digit",
    month: isSameDay(referenceDate, date) ? undefined : "short",
    day: isSameDay(referenceDate, date) ? undefined : "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: undefined,
  })
}

export const formatExportDate = (date?: Date) => (date ? format(date, "d/M/y HH:mm") : "")
