export function cn(...inputs) {
    return inputs.flat().filter(Boolean).join(" ");
}

// Only allow same-site relative paths -- so a crafted link can't send users elsewhere
export function getSafeRedirect(value, fallback = "/") {

    if (typeof value !== "string") return fallback;

    if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
        return fallback;
    }

    return value;
}