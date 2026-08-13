export default function SiteList({ sites, selectedSite, onSelect, emptyMessage = 'No matching sites.' }) {
  if (sites.length === 0) {
    return (
      <div className="calendar-empty">
        <div className="calendar-empty-icon" aria-hidden="true">🔎</div>
        <div className="calendar-empty-text">{emptyMessage}</div>
      </div>
    )
  }

  return (
    <div className="site-list" aria-label="Sites">
      {sites.map((s) => {
        const isSelected = selectedSite && selectedSite.site === s.site
        return (
          <button
            type="button"
            key={s.site}
            className={`site-list-item ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(s)}
            title={s.url}
          >
            <span className="site-list-url">{s.url}</span>
            <span className="site-list-slug">{s.site}</span>
          </button>
        )
      })}
    </div>
  )
}
