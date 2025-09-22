import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

export default function NewsCardList({
  articles = [],
  visible = 0,
  onShowMore = () => {},
}) {
  const toShow = visible > 0 ? articles.slice(0, visible) : articles;

  return (
    <section className="news-list">
      <div className="news-list__grid">
        {toShow.map((article, i) => (
          <NewsCard key={article.url || i} article={article} />
        ))}
      </div>

      {visible > 0 && visible < articles.length && (
        <div className="news-list__more">
          <button type="button" className="news-list__btn" onClick={onShowMore}>
            Show more
          </button>
        </div>
      )}
    </section>
  );
}
