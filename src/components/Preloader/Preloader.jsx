import "./Preloader.css";

export default function Preloader() {
  return (
    <div className="preloader" role="status" aria-live="polite">
      <span className="preloader__spinner" />
      <span className="visually-hidden">Loading…</span>
    </div>
  );
}
