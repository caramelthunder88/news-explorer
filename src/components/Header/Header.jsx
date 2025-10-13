import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import "./Header.css";

export default function Header({
  isLoggedIn = false,
  userName = "Guest",
  onSignIn,
  onSearch,
  loading = false,
  saved = false,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className={`header ${saved ? "header--saved" : ""}`}>
      <div className="header__bar">
        <button
          type="button"
          className="header__menu-btn"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="header-sheet"
          onClick={() => setMenuOpen(true)}
        >
          <span className="header__menu-icon" />
        </button>

        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>
        <Navigation isLoggedIn={isLoggedIn} />
        <button
          type="button"
          className="header__auth-btn"
          onClick={onSignIn}
          aria-label={isLoggedIn ? `Logged in as ${userName}` : "Sign in"}
        >
          {isLoggedIn ? userName : "Sign in"}
        </button>
      </div>

      {!saved && (
        <>
          <div className="header__container">
            <h1 className="header__title">What’s going on in the world?</h1>
            <p className="header__subtitle">
              Find the latest news on any topic and save them in your personal
              account.
            </p>
          </div>

          <div className="header__search">
            <SearchForm onSearch={onSearch} loading={loading} />
          </div>
        </>
      )}

      {/* NEW: Mobile dropdown “sheet” overlay with nav + sign-in */}
      {menuOpen && (
        <div
          className="header__sheet"
          role="dialog"
          aria-modal="true"
          id="header-sheet"
          onClick={(e) => e.target === e.currentTarget && setMenuOpen(false)}
        >
          <div className="header__sheet-panel">
            <div className="header__sheet-bar">
              <Link to="/" className="header__logo">
                NewsExplorer
              </Link>
              <button
                className="header__close-btn"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              />
            </div>

            <div className="header__sheet-body">
              <Navigation isLoggedIn={isLoggedIn} />
              <button
                type="button"
                className="header__auth-btn header__auth-btn--sheet"
                onClick={onSignIn}
              >
                {isLoggedIn ? userName : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
