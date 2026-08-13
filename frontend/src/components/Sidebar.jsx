import { useMemo, useState } from 'react'
import SnapshotCalendar from './SnapshotCalendar.jsx'
import SnapshotList from './SnapshotList.jsx'
import SiteList from './SiteList.jsx'

export default function Sidebar({ site, dates, modes, selectedDate, loading, error, onSelectDate, sites, onSelectSite }) {
  const [view, setView] = useState('calendar')
  const [siteQuery, setSiteQuery] = useState('')

  const filteredSites = useMemo(() => {
    const q = siteQuery.trim().toLowerCase()
    if (!q) return sites
    return sites.filter((s) => s.url.toLowerCase().includes(q) || s.site.toLowerCase().includes(q))
  }, [sites, siteQuery])

  const browsing = siteQuery.trim() !== '' || !site

  function handleSelectSite(siteObj) {
    setSiteQuery('')
    onSelectSite(siteObj)
  }

  return (
    <aside className="sidebar" aria-label="Snapshot calendar">
      <div className="sidebar-header">
        <p className="sidebar-title">
          {browsing ? 'Sites' : 'Snapshots'}
          {!browsing && dates.length > 0 && (
            <span className="snap-count-badge">{dates.length} snapshot{dates.length !== 1 ? 's' : ''}</span>
          )}
        </p>

        {site ? (
          <div className="site-info">
            <div className="site-dot" aria-hidden="true" />
            <span className="site-name" title={site.url}>{site.site}</span>
          </div>
        ) : (
          <div className="site-info">
            <span className="site-name site-name-empty">Search or pick a site below</span>
          </div>
        )}

        {site && dates.length > 0 && (
          <div className="view-toggle" role="tablist" aria-label="Snapshot view">
            <button
              type="button"
              role="tab"
              aria-selected={view === 'calendar'}
              className={`view-toggle-btn ${view === 'calendar' ? 'active' : ''}`}
              onClick={() => setView('calendar')}
            >
              Calendar
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === 'list'}
              className={`view-toggle-btn ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
            >
              List
            </button>
          </div>
        )}
      </div>

      <div className="site-search">
        <span className="site-search-icon" aria-hidden="true">🔎</span>
        <input
          className="site-search-input"
          type="text"
          placeholder="Search tracked sites…"
          value={siteQuery}
          onChange={(e) => setSiteQuery(e.target.value)}
          aria-label="Search tracked sites"
        />
        {siteQuery && (
          <button
            type="button"
            className="site-search-clear"
            onClick={() => setSiteQuery('')}
            aria-label="Clear site search"
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="calendar-scroll">
        {browsing ? (
          <SiteList
            sites={filteredSites}
            selectedSite={site}
            onSelect={handleSelectSite}
            emptyMessage={sites.length === 0 ? 'No sites yet. Add one with the + button.' : 'No matching sites.'}
          />
        ) : loading ? (
          <div className="calendar-empty">
            <div className="calendar-empty-icon" aria-hidden="true">⏳</div>
            <div className="calendar-empty-text">Loading snapshots…</div>
          </div>
        ) : error ? (
          <div className="calendar-empty">
            <div className="calendar-empty-icon" aria-hidden="true">⚠️</div>
            <div className="calendar-empty-text">Failed to load snapshots.<br />{error}</div>
          </div>
        ) : dates.length === 0 ? (
          <div className="calendar-empty">
            <div className="calendar-empty-icon" aria-hidden="true">📭</div>
            <div className="calendar-empty-text">
              No snapshots yet.<br />Run <code>full_capture.py</code> to capture this site.
            </div>
          </div>
        ) : view === 'calendar' ? (
          <SnapshotCalendar site={site} dates={dates} modes={modes} selectedDate={selectedDate} onSelectDate={onSelectDate} />
        ) : (
          <SnapshotList site={site} dates={dates} modes={modes} selectedDate={selectedDate} onSelectDate={onSelectDate} />
        )}
      </div>
    </aside>
  )
}
