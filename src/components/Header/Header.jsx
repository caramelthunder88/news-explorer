import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import "./Header.css";

export default function Header({
  isLoggedIn = false,
  userName = "Guest",
  onSignIn,
}) {
  return (
    <header className="header">
      <div className="header__bar">
        <Link to="/" className="header__logo">
          News Explorer
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

      <div className="header__container">
        <h1 className="header__title">What’s going on in the world?</h1>
        <p className="header__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
      </div>

      {/* ⬇️ Search lives here, below hero, inside header */}
      <div className="header__search">
        <SearchForm onSearch={(q) => console.log("search:", q)} />
      </div>
    </header>
  );
}
