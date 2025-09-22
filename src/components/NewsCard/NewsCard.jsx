export default function NewsCard({ article = {} }) {
  return <article className="news-card">{article.title || "Untitled"}</article>;
}
