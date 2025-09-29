import { useEffect } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/closeBtn.svg";

export default function ModalWithForm({
  isOpen,
  title,
  submitLabel = "Submit",
  onClose,
  onSubmit,
  children,
  disabled = false,
  busy = false,
  error = "",
  variant = "signin",
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className={`modal__dialog modal__dialog--${variant}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <img
            src={closeIcon}
            alt=""
            aria-hidden="true"
            className="modal__close-icon"
          />
        </button>

        {title && (
          <h2 id="modal-title" className="modal__title">
            {title}
          </h2>
        )}

        <form className="modal__form" onSubmit={onSubmit} aria-busy={busy}>
          {children}
          {error && <p className="modal__error">{error}</p>}
          <button
            type="submit"
            className="modal__submit"
            disabled={disabled}
            aria-disabled={disabled}
          >
            {busy ? `${submitLabel}…` : submitLabel}{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
