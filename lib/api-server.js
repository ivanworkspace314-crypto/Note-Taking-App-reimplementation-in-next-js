import { headers } from "next/headers";

const getServerBaseUrl = () => {
  const explicitBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;

  if (explicitBaseUrl) {
    return explicitBaseUrl;
  }

  const incomingHeaders = headers();
  const host = incomingHeaders.get("x-forwarded-host") || incomingHeaders.get("host");
  const proto = incomingHeaders.get("x-forwarded-proto") || "http";

  if (!host) {
    return "http://localhost:3000/api";
  }

  return `${proto}://${host}/api`;
};

const requestJson = async (path, options = {}) => {
  const response = await fetch(`${getServerBaseUrl()}${path}`, {
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json();
};

export const getNotes = () => requestJson("/notes");

export const getNoteById = (id) => requestJson(`/notes/${id}`);
