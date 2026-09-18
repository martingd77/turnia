const dateFormatter = new Intl.DateTimeFormat('es-AR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

export function toISODate(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseISODate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function addDays(isoDate: string, days: number): string {
  const date = parseISODate(isoDate)
  date.setDate(date.getDate() + days)
  return toISODate(date)
}

export function formatLongDate(isoDate: string): string {
  const formatted = dateFormatter.format(parseISODate(isoDate))
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export function formatTime(time: string): string {
  return time
}

export function todayISODate(): string {
  return toISODate(new Date())
}
