import About from "../components/About/About.jsx";
import Main from "../components/Main/Main.jsx";

export default function Home({
  status,
  articles,
  visible,
  onShowMore,
  errorMsg,
}) {
  return (
    <>
      <Main
        status={status}
        articles={articles}
        visible={visible}
        onShowMore={onShowMore}
        errorMsg={errorMsg}
      />
      <About />
    </>
  );
}
