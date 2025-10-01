import Preloader from "../Preloader/Preloader.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";

export default function Main({
  isLoggedIn,
  status,
  articles,
  visible,
  onShowMore,
  errorMsg,
  searchTerm,
}) {
  return (
    <section className="main">
      <div className="container">
        {status === "idle" && null}

        {status === "loading" && (
          <section className="news-list" aria-live="polite" aria-busy="true">
            <Preloader />
          </section>
        )}

        {status === "empty" && (
          <section className="news-list" role="status" aria-live="polite">
            <div className="news-list__header">
              <h2 className="news-list__title">Nothing found</h2>
              <p className="news-list__subtitle">
                Sorry, nothing matched your request.
              </p>
            </div>
          </section>
        )}

        {status === "error" && (
          <section className="news-list" role="alert" aria-live="assertive">
            <div className="news-list__header">
              <h2 className="news-list__title">Something went wrong</h2>
              <p className="news-list__subtitle">
                {errorMsg ||
                  "Sorry, something went wrong during the request. Please try again later."}
              </p>
            </div>
          </section>
        )}

        {status === "success" && (
          <NewsCardList
            articles={articles}
            visible={visible}
            onShowMore={onShowMore}
            status="success"
            title="Search results"
            isLoggedIn={isLoggedIn}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </section>
  );
}
