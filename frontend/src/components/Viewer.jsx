import { useEffect, useState } from 'react'
import { getSnapshotUrl } from '../services/api.js'
import LoadingSpinner from './LoadingSpinner.jsx'
import ScreenshotFallback from './ScreenshotFallback.jsx'

export default function Viewer({ site, date, mode, sidebarCollapsed, onToggleSidebar, onScreenshotError }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (site && date) setLoading(true)
  }, [site, date])

  if (!site || !date) {
    return (
      <section className="viewer-pane" aria-label="Snapshot viewer">
        <div className="viewer-placeholder" aria-label="Viewer placeholder">
          <div className="placeholder-icon" aria-hidden="true">🗃</div>
          <h1 className="placeholder-title">Select a snapshot to preview</h1>
          <p className="placeholder-subtitle">
            Choose a URL from the toolbar, then click any highlighted date in the calendar to
            replay an archived version of the page — served live from local disk, with all CSS,
            images and fonts intact.
          </p>
        </div>
      </section>
    )
  }

  const isScreenshot = mode === 'screenshot'

  return (
    <section className="viewer-pane" aria-label="Snapshot viewer">
      <LoadingSpinner active={loading} />

      <div className="viewer-topbar" aria-label="Snapshot info">
        <button
          type="button"
          className="sidebar-toggle-btn"
          onClick={onToggleSidebar}
          aria-label={sidebarCollapsed ? 'Expand calendar sidebar' : 'Collapse calendar sidebar'}
          title={sidebarCollapsed ? 'Expand calendar sidebar' : 'Collapse calendar sidebar'}
        >
          <span aria-hidden="true">{sidebarCollapsed ? '▶' : '◀'}</span>
        </button>

        <div className="viewer-breadcrumb" aria-live="polite">
          <span aria-hidden="true">📦</span>
          <span className="bc-site">{site}</span>
          <span aria-hidden="true">›</span>
          <span className="bc-date">{date}</span>
        </div>

        <div className="viewer-badges">
          <span className="badge badge-archived">✓ Archived</span>
          <span className="badge badge-offline">
            {isScreenshot ? '📷 Screenshot — resources incomplete' : '⚡ Served from Local Archive'}
          </span>
        </div>
      </div>

      {isScreenshot ? (
        <ScreenshotFallback
          site={site}
          date={date}
          onLoad={() => setLoading(false)}
          onError={onScreenshotError}
        />
      ) : (
        <iframe
          key={`${site}/${date}`}
          className="snapshot-iframe"
          title="Archived snapshot viewer"
          sandbox="allow-same-origin allow-scripts allow-forms"
          loading="lazy"
          onLoad={() => setLoading(false)}
          src={getSnapshotUrl(site, date)}
        />
      )}
    </section>
  )
}
