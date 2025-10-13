import { NavLink } from "react-router-dom";
import "./Navigation.css";

export default function Navigation({ isLoggedIn = false }) {
  return (
    <nav className="nav" aria-label="Primary">
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav__link nav__link--home ${isActive ? "nav__link--active" : ""}`
            }
          >
            Home
          </NavLink>
        </li>

        {isLoggedIn && (
          <li className="nav__item">
            <NavLink
              to="/saved-news"
              className={({ isActive }) =>
                `nav__link ${isActive ? "nav__link--active" : ""}`
              }
            >
              Saved articles
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
