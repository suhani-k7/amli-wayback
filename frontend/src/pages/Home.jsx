import { useCallback, useEffect, useRef, useState } from 'react'
import Header from '../components/Header.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Viewer from '../components/Viewer.jsx'
import { useSites } from '../hooks/useSites.js'
import { useSnapshots } from '../hooks/useSnapshots.js'

export default function Home() {
  const sitesApi = useSites()
  const snapshotsApi = useSnapshots()

  const [selectedSite, setSelectedSite] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [adding, setAdding] = useState(false)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    document.documentElement.classList.toggle('light-theme', saved === 'light')
  }, [])

  const showToast = useCallback((msg, type = 'info') => {
    setToast({ msg, type })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3500)
  }, [])

  const toggleTheme = useCallback(() => {
    const isLight = document.documentElement.classList.contains('light-theme')
    if (isLight) {
      document.documentElement.classList.remove('light-theme')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.add('light-theme')
      localStorage.setItem('theme', 'light')
    }
  }, [])

  const handleSelectSite = useCallback(
    async (siteObj) => {
      setSelectedSite(siteObj)
      setSelectedDate(null)
      setSidebarCollapsed(false)
      snapshotsApi.load(siteObj.site)
    },
    [snapshotsApi],
  )

  const handleSelectDate = useCallback((date) => {
    setSelectedDate(date)
    setSidebarCollapsed(true)
  }, [])

  const tryLoadUrl = useCallback(
    (url) => {
      const existing = sitesApi.sites.find(
        (s) => s.url === url || s.url.replace(/\/$/, '') === url.replace(/\/$/, ''),
      )
      if (existing) {
        handleSelectSite(existing)
      } else {
        showToast('URL not tracked yet — add it with the + button', 'info')
      }
    },
    [sitesApi.sites, handleSelectSite, showToast],
  )

  const handleAddUrl = useCallback(async () => {
    const url = inputValue.trim()
    if (!url) {
      showToast('Please enter a URL first', 'error')
      return
    }
    if (!/^https?:\/\//i.test(url)) {
      showToast('URL must start with http:// or https://', 'error')
      return
    }

    setAdding(true)
    try {
      const added = await sitesApi.add(url)
      showToast(`✓ Added: ${added.url}`, 'success')
      await handleSelectSite({ url: added.url, site: added.site })
    } catch (e) {
      showToast(`Error: ${e.message}`, 'error')
    } finally {
      setAdding(false)
    }
  }, [inputValue, sitesApi, handleSelectSite, showToast])

  const selectedMode = selectedDate ? snapshotsApi.modes[selectedDate] : null

  return (
    <div className="app">
      <Header onToggleTheme={toggleTheme}>
        <SearchBar
          sites={sitesApi.sites}
          onSelect={handleSelectSite}
          onNotFound={tryLoadUrl}
          onValueChange={setInputValue}
        />
        <button type="button" className="btn-add" onClick={handleAddUrl} disabled={adding} title="Add this URL to tracked sites">
          <span aria-hidden="true">＋</span>
          {adding ? 'Adding…' : 'Add URL'}
        </button>
      </Header>

      <main className={`main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Sidebar
          site={selectedSite}
          sites={sitesApi.sites}
          onSelectSite={handleSelectSite}
          dates={snapshotsApi.dates}
          modes={snapshotsApi.modes}
          selectedDate={selectedDate}
          loading={snapshotsApi.loading}
          error={snapshotsApi.error}
          onSelectDate={handleSelectDate}
        />
        <Viewer
          site={selectedSite ? selectedSite.site : null}
          date={selectedDate}
          mode={selectedMode}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
          onScreenshotError={() => showToast('No screenshot available for this date', 'error')}
        />
      </main>

      {toast && (
        <div className={`toast ${toast.type}`} role="alert" aria-live="polite">
          {toast.msg}
        </div>
      )}
    </div>
  )
}
