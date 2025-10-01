import { useEffect, useState, useCallback } from "react";
import NewsCardList from "../components/NewsCardList/NewsCardList.jsx";
import { listSaved, removeArticle } from "../utils/savedArticlesStub.js";
import "./SavedNews.css";

export default function SavedNews({ userName = "Guest" }) {
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

  const count = articles.length;
  const hasAny = count > 0;

  const counts = articles.reduce((acc, a) => {
    const k = (a.keyword || "").trim();
    if (!k) return acc;
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});
  const ranked = Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([k]) => k);

  const [primary, secondary, ...rest] = ranked;
  const remainder = Math.max(0, rest.length);

  return (
    <>
      <section className="saved__intro">
        <div className="saved__inner">
          <p className="saved__eyebrow">Saved articles</p>
          <h1 className="saved__heading">
            {userName}, you have {count} saved article{count === 1 ? "" : "s"}
          </h1>
          <p className="saved__meta">
            By keywords:&nbsp;
            {ranked.length === 0 ? (
              <span className="saved__kw">—</span>
            ) : (
              <>
                <span className="saved__kw">{primary}</span>
                {secondary && (
                  <>
                    {" "}
                    , <span className="saved__kw">{secondary}</span>
                  </>
                )}
                {remainder > 0 && (
                  <>
                    , and{" "}
                    <span className="saved__kw">
                      {remainder} other{remainder > 1 ? "s" : ""}
                    </span>
                  </>
                )}
              </>
            )}
          </p>
        </div>
      </section>

      <section className="saved">
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
      </section>
    </>
  );
}
