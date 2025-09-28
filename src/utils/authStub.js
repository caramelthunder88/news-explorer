const TOKEN_KEY = "ne_token";
const USER_KEY = "ne_user";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function authorize(email, password) {
  await sleep(400);

  const token = "fake-" + btoa(`${email}:${password}`);
  localStorage.setItem(TOKEN_KEY, token);

  const existing = getStoredUser() ?? { name: "Demo User", email };
  localStorage.setItem(USER_KEY, JSON.stringify(existing));

  return { token };
}

export async function register({ name, email, password }) {
  await sleep(450);
  if (!email?.includes("@") || !password) {
    throw new Error("Invalid input");
  }
  const token = "fake-" + btoa(`${email}:${password}`);
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({ name: name || "New User", email })
  );
  return { token };
}

export async function checkToken(token) {
  await sleep(300);
  const stored = localStorage.getItem(TOKEN_KEY);
  if (stored && stored === token) {
    const user = getStoredUser() ?? {
      name: "Demo User",
      email: "demo@example.com",
    };
    return { data: { ...user, _id: "fake-id" } };
  }
  throw new Error("Invalid token");
}

export async function signout() {
  await sleep(150);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  return { ok: true };
}
