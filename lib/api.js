const DEFAULT_APP_URL = "http://localhost:3000";

export const getApiBaseUrl = () => {
  const explicitBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL;

  if (explicitBaseUrl) {
    return explicitBaseUrl;
  }

  if (typeof window === "undefined") {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || DEFAULT_APP_URL;
    return `${appUrl}/api`;
  }

  return "/api";
};

const requestJson = async (path, options = {}) => {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
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

export const createNote = (payload) =>
  requestJson("/notes", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateNote = (id, payload) =>
  requestJson(`/notes/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );

export const deleteNote = (id) =>
  requestJson(`/notes/${id}`,
    {
      method: "DELETE",
    }
  );
