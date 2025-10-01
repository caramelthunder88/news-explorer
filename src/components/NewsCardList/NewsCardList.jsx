import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

export default function NewsCardList({
  articles = [],
  visible,
  onShowMore,
  status = "success",
  errorMessage = "Sorry, nothing matched your request.",
  title = "Search results",
  showHeader = true,
  isLoggedIn = false,
  context = "home",
  onRemove,
  searchTerm,
}) {
  const toShow =
    typeof visible === "number" && visible > 0
      ? articles.slice(0, visible)
      : articles;

  if (status === "loading") {
    return (
      <section className="news-list" aria-busy="true">
        {showHeader && (
          <div className="news-list__header">
            <h2 className="news-list__title">{title}</h2>
          </div>
        )}
        <div className="news-list__grid">
          {[0, 1, 2].map((i) => (
            <div key={i} className="news-list__skel" />
          ))}
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="news-list" role="status">
        {showHeader && (
          <div className="news-list__header">
            <h2 className="news-list__title">Error</h2>
            <p className="news-list__subtitle">{errorMessage}</p>
          </div>
        )}
      </section>
    );
  }

  if (!articles.length) return null;

  return (
    <section className="news-list" aria-label={title}>
      {showHeader && (
        <div className="news-list__header">
          <h2 className="news-list__title">{title}</h2>
        </div>
      )}

      <div className="news-list__grid">
        {toShow.map((article, i) => {
          const card =
            context === "home" && searchTerm
              ? { ...article, keyword: searchTerm.trim() }
              : article;
          return (
            <NewsCard
              key={card.url ?? i}
              card={card}
              isLoggedIn={isLoggedIn}
              context={context}
              onRemove={onRemove}
            />
          );
        })}
      </div>

      {typeof visible === "number" && visible < articles.length && (
        <div className="news-list__more">
          <button type="button" className="news-list__btn" onClick={onShowMore}>
            Show more
          </button>
        </div>
      )}
    </section>
  );
}
