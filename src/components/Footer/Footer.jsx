import { NavLink } from "react-router-dom";
import "./Footer.css";
import GitHubIcon from "../../assets/GitHubIcon.svg";
import LinkedinIcon from "../../assets/LinkedinIcon.svg";

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

            <li className="footer__icons">
              <a
                className="footer__icon"
                href="https://github.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (opens in a new tab)"
                title="GitHub"
              >
                <img src={GitHubIcon} alt="" width="20" height="20" />
              </a>

              <a
                className="footer__icon"
                href="https://www.linkedin.com/in/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in a new tab)"
                title="LinkedIn"
              >
                <img src={LinkedinIcon} alt="" width="20" height="20" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
