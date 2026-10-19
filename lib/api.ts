import "server-only";

const API_URL = process.env.BACKEND_URL;
if (!API_URL) {
  throw new Error("BACKEND_URL is not configured");
}

export async function fetcher<T>(path: string, init?: RequestInit): Promise<T | null> {
  const url = `${API_URL}/${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const text = await res.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text) as Promise<T>;
}
