const JSON_HEADERS = { 'Content-Type': 'application/json' }

async function request(url, options = {}) {
  let res
  try {
    res = await fetch(url, options)
  } catch (e) {
    throw new Error('Network error — is the backend running?')
  }

  let data = null
  const contentType = res.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    data = await res.json().catch(() => null)
  }

  if (!res.ok) {
    throw new Error((data && data.error) || `Request failed (${res.status} ${res.statusText})`)
  }
  return data
}

// ---------------------------------------------------------------------------
// Sites
// ---------------------------------------------------------------------------

export async function getSites(q) {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  const qs = params.toString()
  return request(`/api/sites${qs ? `?${qs}` : ''}`)
}

export async function addSite(url) {
  return request('/api/sites', {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify({ url }),
  })
}

// ---------------------------------------------------------------------------
// Snapshots
// ---------------------------------------------------------------------------

export async function getSnapshots(site) {
  const data = await request(`/api/snapshots/${encodeURIComponent(site)}`)
  return { dates: data.dates || [], modes: data.modes || {} }
}

// ---------------------------------------------------------------------------
// Replay URLs (served by Flask, embedded unchanged)
// ---------------------------------------------------------------------------

export function getSnapshotUrl(site, date) {
  return `/view/${encodeURIComponent(site)}/${encodeURIComponent(date)}/`
}

export function getScreenshotUrl(site, date) {
  return `/view/${encodeURIComponent(site)}/${encodeURIComponent(date)}/screenshot`
}
