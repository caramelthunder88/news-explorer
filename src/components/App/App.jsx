import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import About from "../About/About.jsx";
import SavedNews from "../../pages/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userName = "Guest";

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onSignIn={() => setIsLoggedIn((v) => !v)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />
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

      <Footer isLoggedIn={isLoggedIn} />
    </>
  );
}
