const KEY = "ne_saved_articles";

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};
const write = (list) => localStorage.setItem(KEY, JSON.stringify(list));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function listSaved() {
  return read();
}
export function isSaved(url) {
  return read().some((a) => a.url === url);
}
export function saveArticle(article) {
  const list = read();
  if (!list.some((a) => a.url === article.url)) {
    list.push(article);
    write(list);
  }
}
export function removeArticle(url) {
  write(read().filter((a) => a.url !== url));
}
export function toggleSaved(article) {
  if (isSaved(article.url)) {
    removeArticle(article.url);
    return false;
  }
  saveArticle(article);
  return true;
}

export async function listSavedAsync() {
  await sleep(200);
  return listSaved();
}
export async function saveArticleAsync(article) {
  await sleep(250);
  saveArticle(article);
  return { ...article, _id: Math.random().toString(36).slice(2) };
}
export async function removeArticleAsync(url) {
  await sleep(200);
  removeArticle(url);
  return { ok: true };
}
export async function toggleSavedAsync(article) {
  await sleep(220);
  return toggleSaved(article);
}
