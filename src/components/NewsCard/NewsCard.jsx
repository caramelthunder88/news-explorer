import { useEffect, useMemo, useState } from "react";
import "./NewsCard.css";
import { isSaved, toggleSaved } from "../../utils/savedArticlesStub.js";
import { formatArticleDate } from "../../utils/date.js";

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

  const sourceName = typeof source === "string" ? source : (source?.name ?? "");

  const dateText = useMemo(() => formatArticleDate(publishedAt), [publishedAt]);

  const [savedState, setSavedState] = useState(false);

  useEffect(() => {
    if (url) setSavedState(isSaved(url));
    else setSavedState(false);
  }, [url]);

  const isSavedContext = context === "saved";

  const btnLabel = isSavedContext
    ? "Remove from saved"
    : savedState
      ? "Remove from saved"
      : isLoggedIn
        ? "Save article"
        : "Sign in to save articles";

  const handleBtn = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSavedContext) {
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

  const imgSrc =
    urlToImage ||
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop";

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
            src={imgSrc}
            alt={title || "News thumbnail"}
            loading="lazy"
          />

          {isSavedContext && keyword && (
            <span className="card__chip">{keyword}</span>
          )}

          <button
            type="button"
            className={[
              "card__btn",
              isSavedContext ? "card__btn--delete" : "card__btn--save",
              savedState && !isSavedContext ? "is-active" : "",
              !isLoggedIn && !isSavedContext ? "is-locked" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={btnLabel}
            title={btnLabel}
            aria-pressed={!isSavedContext ? Boolean(savedState) : undefined}
            onClick={handleBtn}
          />

          {!isLoggedIn && !isSavedContext && (
            <span className="card__hint">Sign in to save articles</span>
          )}
        </div>

        <div className="card__body">
          <time className="card__date" dateTime={publishedAt || ""}>
            {dateText}
          </time>

          <h3 className="card__title">{title}</h3>

          {description && <p className="card__text">{description}</p>}

          {sourceName && <span className="card__source">{sourceName}</span>}
        </div>
      </a>
    </article>
  );
}
