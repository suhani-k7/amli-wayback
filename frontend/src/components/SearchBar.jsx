import { useMemo, useRef, useState } from 'react'

export default function SearchBar({ sites, onSelect, onNotFound, onValueChange }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const blurTimer = useRef(null)

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return sites.slice(0, 20)
    return sites
      .filter((s) => s.url.toLowerCase().includes(needle) || s.site.toLowerCase().includes(needle))
      .slice(0, 20)
  }, [sites, query])

  const listOpen = open && filtered.length > 0
  // Keyboard highlight shows the highlighted URL in the field without
  // disturbing the query used for filtering (mirrors the original UI).
  const displayValue = activeIndex >= 0 && filtered[activeIndex] ? filtered[activeIndex].url : query

  function handleInputChange(e) {
    const value = e.target.value
    setQuery(value)
    setActiveIndex(-1)
    setOpen(true)
    onValueChange(value)
  }

  function handleFocus() {
    setOpen(true)
  }

  function handleBlur() {
    clearTimeout(blurTimer.current)
    blurTimer.current = setTimeout(() => {
      setOpen(false)
      setActiveIndex(-1)
    }, 150)
  }

  function selectItem(item) {
    setQuery(item.url)
    setActiveIndex(-1)
    setOpen(false)
    onValueChange(item.url)
    onSelect(item)
  }

  function handleSelectFromNotFound(rawUrl) {
    const url = (rawUrl || '').trim()
    if (!url) return
    onNotFound(url)
    setOpen(false)
    setActiveIndex(-1)
  }

  function handleKeyDown(e) {
    if (!listOpen) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.min(activeIndex + 1, filtered.length - 1)
      setActiveIndex(next)
      onValueChange(filtered[next].url)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.max(activeIndex - 1, -1)
      setActiveIndex(next)
      if (next >= 0) onValueChange(filtered[next].url)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0 && filtered[activeIndex]) {
        selectItem(filtered[activeIndex])
      } else {
        handleSelectFromNotFound(query)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
    }
  }

  return (
    <div className="search-wrapper" role="search">
      <span className="search-icon" aria-hidden="true">🔍</span>
      <input
        className="search-input"
        type="url"
        placeholder="Search or paste a URL… e.g. https://example.com"
        autoComplete="off"
        spellCheck="false"
        aria-label="Search or enter a URL"
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
        aria-expanded={listOpen}
        value={displayValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      {listOpen && (
        <div id="autocomplete-list" className="autocomplete-list" role="listbox" aria-label="URL suggestions">
          {filtered.map((item, i) => (
            <div
              key={item.url}
              className={`ac-item ${i === activeIndex ? 'active' : ''}`}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => selectItem(item)}
            >
              <span className="ac-url">{item.url}</span>
              <span className="ac-site">{item.site}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
