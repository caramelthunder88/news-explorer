import Header from "../components/Header/Header.jsx";
import SearchForm from "../components/SearchForm/SearchForm.jsx";
import Footer from "../components/Footer/Footer.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container" style={{ padding: "0 0 48px" }}>
        <SearchForm onSearch={(q) => console.log("search:", q)} />
      </main>
      <Footer />
    </>
  );
}
