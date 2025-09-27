const PROD = import.meta.env.PROD;
const BASE_URL = PROD
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function dateRange7Days() {
  const now = new Date();
  const to = now.toISOString().slice(0, 10);
  const from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  return { from, to };
}

export async function getNews(query) {
  const { from, to } = dateRange7Days();

  const params = new URLSearchParams({
    q: query,
    from,
    to,
    pageSize: "100",
    sortBy: "publishedAt",
    language: "en",
  });

  if (!PROD) {
    if (!API_KEY) throw new Error("Missing VITE_NEWS_API_KEY");
    params.set("apiKey", API_KEY);
  }

  const url = `${BASE_URL}?${params.toString()}`;
  console.log("Fetching:", url);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`News request failed: HTTP ${res.status}`);
  const data = await res.json();
  return data.articles ?? [];
}
