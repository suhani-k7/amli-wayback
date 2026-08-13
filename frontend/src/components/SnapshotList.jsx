import { useMemo } from 'react'

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
      return {
        ym,
        label: new Date(year, month - 1, 1).toLocaleString('default', { month: 'long', year: 'numeric' }),
        dates: [...byMonth[ym]].sort().reverse(),
      }
    })
}

export default function SnapshotList({ dates, modes, selectedDate, onSelectDate }) {
  const months = useMemo(() => groupByMonth(dates), [dates])

  return (
    <div className="snapshot-list" aria-label="Snapshot dates">
      {months.map(({ ym, label, dates: monthDates }) => (
        <div className="snapshot-list-month" key={ym}>
          <div className="snapshot-list-month-label">{label}</div>
          {monthDates.map((date) => {
            const mode = modes[date]
            const isSelected = date === selectedDate
            return (
              <button
                type="button"
                key={date}
                className={`snapshot-list-item ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectDate(date)}
              >
                <span className="snapshot-item-date">{date}</span>
                <span className={`snapshot-item-mode ${mode === 'screenshot' ? 'screenshot' : ''}`}>
                  {mode === 'screenshot' ? '📷 Screenshot' : 'HTML'}
                </span>
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
