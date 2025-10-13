import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard.jsx";
import NotFoundIconUrl from "../../assets/not-found-icon.svg?url"; // ← add ?url

export default function NewsCardList({
  articles = [],
  visible,
  onShowMore,
  status = "success",
  errorMessage = "Sorry, nothing matched your search terms.",
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
        <div className="news-list__inner">
          {showHeader && (
            <header className="news-list__header">
              <h2 className="news-list__title">{title}</h2>
            </header>
          )}
          <div className="news-list__grid">
            {[0, 1, 2].map((i) => (
              <div key={i} className="news-list__skel" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (status === "empty") {
    return (
      <section
        className="news-list news-list--empty"
        role="status"
        aria-live="polite"
      >
        <div className="news-list__inner">
          <div
            className="news-list__empty"
            role="img"
            aria-label="Nothing found"
          >
            <img
              src={NotFoundIconUrl}
              alt=""
              className="news-list__empty-icon"
              aria-hidden="true"
            />
            <h2 className="news-list__title news-list__title--empty">
              Nothing found
            </h2>
            <p className="news-list__subtitle news-list__subtitle--empty">
              Sorry, nothing matched your search terms.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section
        className="news-list news-list--empty"
        role="status"
        aria-live="polite"
      >
        <div className="news-list__inner">
          <div
            className="news-list__empty"
            role="img"
            aria-label="Nothing found"
          >
            <img
              src={NotFoundIconUrl}
              alt=""
              className="news-list__empty-icon"
              aria-hidden="true"
            />
            <h2 className="news-list__title news-list__title--empty">
              Nothing found
            </h2>
            <p className="news-list__subtitle news-list__subtitle--empty">
              {errorMessage}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!articles.length) return null;

  return (
    <section className="news-list" aria-label={title}>
      <div className="news-list__inner">
        {showHeader && (
          <header className="news-list__header">
            <h2 className="news-list__title">{title}</h2>
          </header>
        )}

        <div className="news-list__grid" role="list">
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
            <button
              type="button"
              className="news-list__btn"
              onClick={onShowMore}
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
