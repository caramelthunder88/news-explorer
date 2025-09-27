import { useEffect, useState } from "react";
import "./NewsCard.css";
import { isSaved, toggleSaved } from "../../utils/savedArticlesStub.js";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const fmt = (d) =>
  d
    ? `${MONTHS[new Date(d).getMonth()]} ${new Date(d).getDate()}, ${new Date(
        d
      ).getFullYear()}`
    : "";

export default function NewsCard({
  card = {},
  isLoggedIn = false,
  context = "home",
  onSave,
  onRemove,
}) {
  const {
    title = "No title",
    description = "",
    source,
    url,
    urlToImage,
    publishedAt,
    keyword,
  } = card;

  const sourceName = typeof source === "string" ? source : source?.name;

  const [savedState, setSavedState] = useState(false);
  useEffect(() => {
    if (url) setSavedState(isSaved(url));
  }, [url]);

  const btnLabel =
    context === "saved"
      ? "Remove from saved"
      : savedState
      ? "Remove from saved"
      : isLoggedIn
      ? "Save article"
      : "Sign in to save articles";

  const handleBtn = (e) => {
    e.preventDefault();

    if (context === "saved") {
      toggleSaved(card);
      setSavedState(false);
      onRemove?.(card);
      return;
    }

    if (savedState) {
      toggleSaved(card);
      setSavedState(false);
      onRemove?.(card);
      return;
    }

    if (!isLoggedIn) return;

    const now = toggleSaved(card);
    setSavedState(now);
    now ? onSave?.(card) : onRemove?.(card);
  };

  return (
    <article className="card">
      <a
        className="card__link"
        href={url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
      >
        <div className="card__media">
          <img
            className="card__img"
            src={
              urlToImage ||
              "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop"
            }
            alt={title}
            loading="lazy"
          />
          {keyword && <span className="card__chip">{keyword}</span>}
          <button
            type="button"
            className={
              "card__btn " +
              (context === "saved" ? "card__btn--delete" : "card__btn--save") +
              (savedState && context !== "saved" ? " is-active" : "")
            }
            aria-label={btnLabel}
            title={btnLabel}
            onClick={handleBtn}
          />

          {!isLoggedIn && context !== "saved" && (
            <span className="card__hint">Sign in to save articles</span>
          )}
        </div>

        <div className="card__body">
          <time className="card__date" dateTime={publishedAt || ""}>
            {fmt(publishedAt)}
          </time>
          <h3 className="card__title">{title}</h3>
          <p className="card__text">{description}</p>
          {sourceName && <span className="card__source">{sourceName}</span>}
        </div>
      </a>
    </article>
  );
}
