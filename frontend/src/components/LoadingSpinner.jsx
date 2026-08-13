export default function LoadingSpinner({ active }) {
  return (
    <div
      className={`spinner-overlay ${active ? 'active' : ''}`}
      role="status"
      aria-label="Loading snapshot"
    >
      <div className="spinner" />
    </div>
  )
}
