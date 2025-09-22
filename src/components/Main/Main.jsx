import Preloader from "../Preloader/Preloader.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";

export default function Main({
  status,
  articles,
  visible,
  onShowMore,
  errorMsg,
}) {
  return (
    <main className="main">
      <section className="container">
        {status === "idle" && null}
        {status === "loading" && <Preloader />}
        {status === "empty" && <p>Nothing Found</p>}
        {status === "error" && <p>{errorMsg}</p>}
        {status === "success" && (
          <NewsCardList
            articles={articles}
            visible={visible}
            onShowMore={onShowMore}
          />
        )}
      </section>
    </main>
  );
}
