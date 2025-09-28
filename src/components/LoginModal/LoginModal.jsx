import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onOpenRegister,
  loading,
  error,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin?.({ email: email.trim(), password });
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign in"
      submitLabel="Sign in"
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={loading}
      error={error}
    >
      <label className="modal__field">
        <span>Email</span>
        <input
          className="modal__input"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="modal__field">
        <span>Password</span>
        <input
          className="modal__input"
          type="password"
          autoComplete="current-password"
          minLength={6}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <p className="modal__switch">
        or{" "}
        <button type="button" className="modal__link" onClick={onOpenRegister}>
          Sign up
        </button>
      </p>
    </ModalWithForm>
  );
}
