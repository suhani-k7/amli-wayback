export default function Header({ onToggleTheme, children }) {
  return (
    <header className="toolbar" role="banner">
      <a className="logo" href="/" aria-label="AMLI Wayback home">
        <div className="logo-icon" aria-hidden="true">🕰</div>
        <div>
          <span className="logo-text">AMLI Wayback</span>
          <span className="logo-subtitle">Local Archive Viewer</span>
        </div>
      </a>

      {children}

      <button
        className="theme-toggle-btn"
        type="button"
        onClick={onToggleTheme}
        aria-label="Toggle theme"
        title="Toggle light/dark theme"
      >
        <span className="sun-icon" aria-hidden="true">☀️</span>
        <span className="moon-icon" aria-hidden="true">🌙</span>
      </button>
    </header>
  )
}
