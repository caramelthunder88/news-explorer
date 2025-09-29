import "./SuccessModal.css";
import closeIcon from "../../assets/closeBtn.svg";

export default function SuccessModal({ isOpen, onClose, onSignIn }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className="modal__dialog modal__dialog_notice"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
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

        <h2 id="success-title" className="modal__title modal__title_sm">
          Registration successfully completed!
        </h2>

        <button
          type="button"
          className="modal__link modal__link_action"
          onClick={onSignIn}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
