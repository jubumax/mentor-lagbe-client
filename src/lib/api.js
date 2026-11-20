import { API_URL } from "@/lib/constants";

const API_BASE = `${API_URL}/api`;

export class ApiError extends Error {
    constructor(message, status, errors) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.errors = errors ?? null;
    }
}

// JWT handling 

let cachedToken = null;
let tokenExpiresAt = 0;
let pendingToken = null;

function readExpiry(token) {
    try {
        const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(atob(payload)).exp * 1000;
    } catch {
        return 0;
    }
}

export function clearToken() {
    cachedToken = null;
    tokenExpiresAt = 0;
    pendingToken = null;
}

async function requestToken() {
    const response = await fetch(`${API_BASE}/jwt`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        throw new ApiError("Please sign in to continue.", response.status);
    }

    const { token } = await response.json();
    cachedToken = token;
    tokenExpiresAt = readExpiry(token);
    return token;
}

export async function getToken() {
    if (cachedToken && Date.now() < tokenExpiresAt - 60_000) return cachedToken;

    pendingToken ??= requestToken().finally(() => {
        pendingToken = null;
    });
    return pendingToken;
}


// Requests

export function toQueryString(params = {}) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            search.set(key, String(value));
        }
    });
    const query = search.toString();
    return query ? `?${query}` : "";
}

export async function apiFetch(
    path,
    { method = "GET", body, auth = true, headers, ...options } = {}
) {
    async function send() {
        const requestHeaders = { Accept: "application/json", ...headers };
        if (body !== undefined) requestHeaders["Content-Type"] = "application/json";
        if (auth) requestHeaders.Authorization = `Bearer ${await getToken()}`;

        return fetch(`${API_BASE}${path}`, {
            method,
            headers: requestHeaders,
            body: body !== undefined ? JSON.stringify(body) : undefined,
            ...options,
        });
    }

    let response;
    try {
        response = await send();

        if (response.status === 401 && auth) {
            clearToken();
            response = await send();
        }
    } catch (error) {
        if (error instanceof ApiError) throw error;

        throw new ApiError(
            "Could not reach the server. Please check your connection.",
            0
        );
    }

    const data =
        response.status === 204 ? null : await response.json().catch(() => null);

    if (!response.ok) {
        throw new ApiError(
            data?.message ?? "Something went wrong. Please try again.",
            response.status,
            data?.errors
        );
    }

    return data;
}


export const api = {
    get: (path, options) => apiFetch(path, { ...options, method: "GET" }),
    post: (path, body, options) => apiFetch(path, { ...options, method: "POST", body }),
    put: (path, body, options) => apiFetch(path, { ...options, method: "PUT", body }),
    patch: (path, body, options) => apiFetch(path, { ...options, method: "PATCH", body }),
    delete: (path, options) => apiFetch(path, { ...options, method: "DELETE" }),
};