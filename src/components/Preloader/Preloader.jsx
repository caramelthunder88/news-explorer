import "./Preloader.css";

export default function Preloader() {
  return (
    <section
      className="preloader"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="circle-preloader" aria-hidden="true" />
      <p className="preloader__text">Searching for news...</p>
    </section>
  );
}
