import { NavLink } from "react-router-dom";
import "./Footer.css";

export default function Footer({ isLoggedIn = false }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <p className="footer__copy">© {year} News Explorer</p>

        <nav className="footer__nav" aria-label="Footer">
          <ul className="footer__links">
            <li>
              <NavLink to="/" className="footer__link">
                Home
              </NavLink>
            </li>
            {isLoggedIn && (
              <li>
                <NavLink to="/saved-news" className="footer__link">
                  Saved articles
                </NavLink>
              </li>
            )}
            <li>
              <a
                className="footer__link"
                href="https://tripleten.com"
                target="_blank"
                rel="noreferrer"
              >
                TripleTen
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
