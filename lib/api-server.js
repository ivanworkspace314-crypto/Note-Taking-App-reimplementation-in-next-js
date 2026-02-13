const normalizeBaseUrl = (value) => {
  if (!value) {
    return "";
  }

  const trimmed = value.replace(/\/$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
};

const getServerBaseUrl = () => {
  const explicitBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;

  if (explicitBaseUrl) {
    return normalizeBaseUrl(explicitBaseUrl);
  }

  if (process.env.VERCEL_URL) {
    return normalizeBaseUrl(`https://${process.env.VERCEL_URL}`);
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;
  if (appUrl) {
    return normalizeBaseUrl(appUrl);
  }

  return "http://localhost:3000/api";
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
