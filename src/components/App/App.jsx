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
    } catch (e) {
      setAuthError("Invalid email or password");
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const handleRegister = useCallback(async ({ name, email, password }) => {
    try {
      setAuthLoading(true);
      setAuthError("");
      const { token } = await register({ name, email, password });
      const { data } = await checkToken(token);
      setIsLoggedIn(true);
      setUserName(data?.name || name || "New User");
      setRegisterOpen(false);
    } catch (e) {
      setAuthError("Sign up failed. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  }, []);

  return (
    <div className={isHome ? "page" : undefined}>
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onSignIn={handleAuthClick}
        onSearch={handleSearch}
        loading={loading}
      />

      <main className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main main--home">
                  <Main
                    isLoggedIn={isLoggedIn}
                    status={status}
                    articles={articles}
                    visible={visible}
                    onShowMore={onShowMore}
                    errorMsg={error}
                  />
                </div>
                <About />
              </>
            }
          />
          <Route
            path="/saved-news"
            element={isLoggedIn ? <SavedNews /> : <Navigate to="/" replace />}
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

      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
}
