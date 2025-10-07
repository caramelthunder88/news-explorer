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

        {status !== "loading" && status !== "idle" && (
          <NewsCardList
            articles={articles}
            visible={visible}
            onShowMore={onShowMore}
            status={status}
            errorMessage={errorMsg}
            title="Search results"
            isLoggedIn={isLoggedIn}
            searchTerm={searchTerm}
          />
        )}
      </div>
    </section>
  );
}
