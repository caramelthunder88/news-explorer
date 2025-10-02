const DEFAULT_LOCALE = "en-US";
const OPTIONS = { year: "numeric", month: "long", day: "numeric" };

export function formatArticleDate(isoString, locale = DEFAULT_LOCALE) {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(locale, OPTIONS);
}
