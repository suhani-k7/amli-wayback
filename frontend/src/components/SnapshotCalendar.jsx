import { useMemo } from 'react'

const MONTH_NAMES = new Array(12).fill(null).map((_, i) =>
  new Date(2000, i, 1).toLocaleString('default', { month: 'long' }),
)

function groupByMonth(dates) {
  const byMonth = {}
  dates.forEach((d) => {
    const ym = d.slice(0, 7)
    if (!byMonth[ym]) byMonth[ym] = []
    byMonth[ym].push(d)
  })
  return Object.keys(byMonth)
    .sort()
    .reverse()
    .map((ym) => {
      const [year, month] = ym.split('-').map(Number)
      const daysInMonth = new Date(year, month, 0).getDate()
      const firstDow = new Date(year, month - 1, 1).getDay()
      return { ym, year, month, daysInMonth, firstDow, dates: new Set(byMonth[ym]) }
    })
}

export default function SnapshotCalendar({ site, dates, modes, selectedDate, onSelectDate }) {
  const months = useMemo(() => groupByMonth(dates), [dates])

  return (
    <div className="calendar" aria-label="Snapshot dates">
      {months.map(({ ym, year, month, daysInMonth, firstDow, dates: dateSet }) => (
        <div className="month-block" key={ym}>
          <div className="month-label">
            {MONTH_NAMES[month - 1]} {year}
          </div>
          <div className="cal-grid">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <div className="cal-day-header" key={d}>{d}</div>
            ))}
            {Array.from({ length: firstDow }, (_, i) => (
              <div className="cal-day empty" key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const dateStr = `${ym}-${String(day).padStart(2, '0')}`
              const hasSnap = dateSet.has(dateStr)
              const isSelected = dateStr === selectedDate
              const mode = modes[dateStr]
              const cls = [
                'cal-day',
                hasSnap ? 'has-snapshot' : '',
                isSelected ? 'selected' : '',
              ].filter(Boolean).join(' ')

              if (!hasSnap) {
                return (
                  <div className={cls} key={dateStr}>
                    {day}
                  </div>
                )
              }
              return (
                <button
                  type="button"
                  key={dateStr}
                  className={cls}
                  title={`Snapshot: ${dateStr}`}
                  data-mode={mode}
                  onClick={() => onSelectDate(dateStr)}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
