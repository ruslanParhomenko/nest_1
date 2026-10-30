import { getServerSession } from "next-auth";
import "server-only";
import { authOptions } from "./auth";
import { SignJWT } from "jose";

const API_URL = process.env.BACKEND_URL;
if (!API_URL) {
  throw new Error("BACKEND_URL is not configured");
}

export type Actor = { id: string; role?: string };

export async function getActor(): Promise<Actor> {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  return { id: session.user.id, role: session.user.role };
}

export async function fetcher<T>(
  path: string,
  actor: Actor,
  init?: RequestInit,
): Promise<T | null> {
  if (!actor?.id) throw new Error("fetcher: actor.id is missing");

  const jwt = await new SignJWT({ role: actor?.role })
    .setSubject(actor?.id)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1m")
    .sign(new TextEncoder().encode(process.env.BACKEND_JWT_SECRET));

  const url = `${API_URL}/${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    cache: "no-store",
  });

  const text = await res.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text) as Promise<T>;
}
