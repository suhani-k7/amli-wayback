import { useCallback, useMemo, useState } from 'react'
import * as api from '../services/api.js'

export function useSnapshots() {
  const [site, setSite] = useState(null)
  const [dates, setDates] = useState([])
  const [modes, setModes] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = useCallback(async (siteSlug) => {
    if (!siteSlug) {
      setSite(null)
      setDates([])
      setModes({})
      setError(null)
      return
    }
    setSite(siteSlug)
    setLoading(true)
    setError(null)
    try {
      const data = await api.getSnapshots(siteSlug)
      setDates(data.dates)
      setModes(data.modes)
    } catch (e) {
      setError(e.message)
      setDates([])
      setModes({})
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setSite(null)
    setDates([])
    setModes({})
    setError(null)
  }, [])

  return useMemo(
    () => ({ site, dates, modes, loading, error, load, reset }),
    [site, dates, modes, loading, error, load, reset],
  )
}
