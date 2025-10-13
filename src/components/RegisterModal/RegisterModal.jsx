import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onOpenLogin,
  loading,
  error,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailOk = /\S+@\S+\.\S+/.test(email.trim());
  const canSubmit =
    name.trim().length > 0 && emailOk && password.trim().length >= 6;

  function handleSubmit(e) {
    e.preventDefault();
    onRegister?.({ name: name.trim(), email: email.trim(), password });
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign up"
      submitLabel="Sign up"
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!canSubmit || loading}
      busy={loading}
      error={error}
      variant="signup"
    >
      <label className="modal__field">
        <span>Email</span>
        <input
          className="modal__input"
          type="email"
          autoComplete="email"
          required
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="modal__field">
        <span>Password</span>
        <input
          className="modal__input"
          type="password"
          autoComplete="new-password"
          minLength={6}
          required
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <label className="modal__field">
        <span>Username</span>
        <input
          className="modal__input"
          type="text"
          autoComplete="name"
          required
          placeholder="Enter your username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <p className="modal__switch">
        or{" "}
        <button type="button" className="modal__link" onClick={onOpenLogin}>
          Sign in
        </button>
      </p>
    </ModalWithForm>
  );
}
