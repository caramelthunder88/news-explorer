import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import About from "../About/About.jsx";
import SavedNews from "../../pages/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userName = "Guest";
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className={isHome ? "page" : undefined}>
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onSignIn={() => setIsLoggedIn((v) => !v)}
      />

      <main className="page__content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main main--home">
                  <Main />
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
