import { useState } from "react";
import "./SearchForm.css";

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [touched, setTouched] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      setTouched(true);
      return;
    }
    onSearch?.(q);
  }

  const showError = touched && !query.trim();

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="search" className="visually-hidden">
        Search news
      </label>
      <input
        id="search"
        className={`search-form__input ${
          showError ? "search-form__input--invalid" : ""
        }`}
        type="text"
        placeholder="Enter topic"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={() => setTouched(true)}
        required
      />
      <button className="search-form__button" type="submit">
        Search
      </button>
      {showError && (
        <span className="search-form__error">Please enter a keyword</span>
      )}
    </form>
  );
}
