import { useEffect, useState } from 'react'
import { getScreenshotUrl } from '../services/api.js'

export default function ScreenshotFallback({ site, date, onLoad, onError }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [site, date])

  return (
    <>
      <div className="screenshot-warning" role="note">
        <span className="screenshot-warning-icon" aria-hidden="true">📷</span>
        <span className="screenshot-warning-text">
          <strong>This snapshot is displayed as a full-page screenshot.</strong>{' '}
          The archived page resources for this date are incomplete, so the website could not be
          re-rendered accurately. Showing the captured screenshot instead.
        </span>
      </div>

      {failed ? (
        <div className="screenshot-error">No screenshot available for this date.</div>
      ) : (
        <div className="screenshot-container">
          <img
            className="snapshot-img"
            alt="Full-page screenshot of the archived snapshot"
            src={getScreenshotUrl(site, date)}
            onLoad={onLoad}
            onError={() => {
              setFailed(true)
              onError?.()
            }}
          />
        </div>
      )}
    </>
  )
}
