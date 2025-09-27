import { useState, useCallback, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  authorize,
  checkToken,
  getStoredToken,
  signout,
} from "../../utils/authStub.js";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import About from "../About/About.jsx";
import SavedNews from "../../pages/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";
import { getNews } from "../../utils/newsApi";

const PAGE = 3;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(0);

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
      return;
    }
    const { token } = await authorize("demo@example.com", "password123");
    const { data } = await checkToken(token);
    setIsLoggedIn(true);
    setUserName(data?.name || "Demo User");
  }, [isLoggedIn]);

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

      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
}
