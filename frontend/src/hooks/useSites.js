import { useCallback, useEffect, useMemo, useState } from 'react'
import * as api from '../services/api.js'

export function useSites() {
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.getSites()
      setSites(data || [])
      setError(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  // Client-side autocomplete filter (matches the original frontend behaviour).
  const search = useCallback(
    (q) => {
      const needle = (q || '').trim().toLowerCase()
      if (!needle) return sites.slice(0, 20)
      return sites
        .filter((s) => s.url.toLowerCase().includes(needle) || s.site.toLowerCase().includes(needle))
        .slice(0, 20)
    },
    [sites],
  )

  const add = useCallback(async (url) => {
    const added = await api.addSite(url)
    setSites((prev) => {
      if (prev.some((s) => s.url === added.url)) return prev
      return [...prev, added].sort((a, b) => a.url.localeCompare(b.url))
    })
    return added
  }, [])

  return useMemo(() => ({ sites, loading, error, search, add, refresh }), [sites, loading, error, search, add, refresh])
}
