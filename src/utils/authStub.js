const TOKEN_KEY = "ne_token";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function authorize(email, password) {
  await sleep(400);

  const token = "fake-" + btoa(email + ":" + password);
  localStorage.setItem(TOKEN_KEY, token);
  return { token };
}

export async function checkToken(token) {
  await sleep(300);
  const stored = localStorage.getItem(TOKEN_KEY);
  if (stored && stored === token) {
    return {
      data: { name: "Demo User", email: "demo@example.com", _id: "fake-id" },
    };
  }
  throw new Error("Invalid token");
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export async function signout() {
  await sleep(150);
  localStorage.removeItem(TOKEN_KEY);
  return { ok: true };
}
