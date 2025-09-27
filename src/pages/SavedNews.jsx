import { useEffect, useState, useCallback } from "react";
import NewsCardList from "../components/NewsCardList/NewsCardList.jsx";
import { listSaved, removeArticle } from "../utils/savedArticlesStub.js";

export default function SavedNews() {
  const [articles, setArticles] = useState([]);

  const refresh = useCallback(() => setArticles(listSaved()), []);
  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleRemove = (card) => {
    if (!card?.url) return;
    removeArticle(card.url);

    setArticles((prev) => prev.filter((a) => a.url !== card.url));
  };

  const hasAny = articles.length > 0;

  return (
    <main className="saved container">
      <h1 className="saved__title">Saved articles</h1>

      {hasAny ? (
        <NewsCardList
          articles={articles}
          status="success"
          title="Saved articles"
          showHeader={false}
          isLoggedIn={true}
          context="saved"
          onRemove={handleRemove}
        />
      ) : (
        <p className="saved__hint">You don’t have any saved articles yet.</p>
      )}
    </main>
  );
}
