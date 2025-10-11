import { useState, useCallback, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  authorize,
  checkToken,
  getStoredToken,
  signout,
  register,
} from "../../utils/authStub.js";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import About from "../About/About.jsx";
import SavedNews from "../../pages/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";
import { getNews } from "../../utils/newsApi";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import SuccessModal from "../SuccessModal/SuccessModal.jsx";

const PAGE = 3;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isSaved = pathname === "/saved-news";
  const [successOpen, setSuccessOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(0);

  const openLogin = useCallback(() => {
    setRegisterOpen(false);
    setAuthError("");
    setLoginOpen(true);
  }, []);
  const openRegister = useCallback(() => {
    setLoginOpen(false);
    setAuthError("");
    setRegisterOpen(true);
  }, []);

  const handleSearch = useCallback(async (q) => {
    const term = q.trim();
    if (!term) return;

    setSearchTerm(term);
    setLoading(true);
    setError("");
    setVisible(0);

    try {
      const items = await getNews(term);
      console.log("Raw[0] from API:", items[0]);

      const normalized = items
        .map((a) => ({
          title: (a?.title || "").trim() || "Untitled",
          description: (a?.description || "").trim(),
          url: a?.url || "",
          urlToImage: a?.urlToImage || "",
          source: { name: a?.source?.name || "" },
          publishedAt: a?.publishedAt || "",
        }))

        .filter((a) => a.url && a.title);

      const seen = new Set();
      const deduped = normalized.filter(
        (a) => !seen.has(a.url) && seen.add(a.url)
      );

      setArticles(deduped);
      setVisible(Math.min(PAGE, deduped.length));
    } catch (e) {
      console.error(e);
      setArticles([]);
      setError(
        "Sorry, something went wrong during the request. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const onShowMore = useCallback(() => {
    setVisible((v) => Math.min(v + PAGE, articles.length));
  }, [articles.length]);

  const status = loading
    ? "loading"
    : error
      ? "error"
      : !searchTerm
        ? "idle"
        : articles.length
          ? "success"
          : "empty";

  useEffect(() => {
    const token = getStoredToken();
    if (!token) return;
    checkToken(token)
      .then((res) => {
        setIsLoggedIn(true);
        setUserName(res.data?.name || "Demo User");
      })
      .catch(() => {
        signout();
        setIsLoggedIn(false);
        setUserName("Guest");
      });
  }, []);

  const handleAuthClick = useCallback(async () => {
    if (isLoggedIn) {
      await signout();
      setIsLoggedIn(false);
      setUserName("Guest");
    } else {
      setAuthError("");
      setLoginOpen(true);
    }
  }, [isLoggedIn]);

  const handleLogin = useCallback(async ({ email, password }) => {
    try {
      setAuthLoading(true);
      setAuthError("");
      const { token } = await authorize(email, password);
      const { data } = await checkToken(token);
      setIsLoggedIn(true);
      setUserName(data?.name || "Demo User");
      setLoginOpen(false);
    } catch {
      setAuthError("Invalid email or password");
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const handleRegister = useCallback(async ({ name, email, password }) => {
    try {
      setAuthLoading(true);
      setAuthError("");

      await register({ name, email, password });

      await signout();
      setIsLoggedIn(false);
      setUserName("Guest");

      setRegisterOpen(false);
      setSuccessOpen(true);
    } catch {
      setAuthError("Sign up failed. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const noResults = isHome && status === "idle";

  return (
    <div
      className={`page scroll-invisible ${isHome ? "page--home" : ""} ${
        isSaved ? "page--saved" : ""
      } ${noResults ? "page--no-results" : ""}`}
    >
      <Header
        saved={isSaved}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onSignIn={handleAuthClick}
        onSearch={isSaved ? undefined : handleSearch}
        loading={isSaved ? false : loading}
      />

      <main className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="page__section page__section--home">
                  <Main
                    isLoggedIn={isLoggedIn}
                    status={status}
                    articles={articles}
                    visible={visible}
                    onShowMore={onShowMore}
                    errorMsg={error}
                    searchTerm={searchTerm}
                  />
                </section>
                <About />
              </>
            }
          />
          <Route
            path="/saved-news"
            element={
              isLoggedIn ? (
                <SavedNews userName={userName} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={handleLogin}
        onOpenRegister={openRegister}
        loading={authLoading}
        error={authError}
      />

      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onRegister={handleRegister}
        onOpenLogin={openLogin}
        loading={authLoading}
        error={authError}
      />

      <SuccessModal
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
        onSignIn={() => {
          setSuccessOpen(false);
          openLogin();
        }}
        variant="success"
      />
      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
}
