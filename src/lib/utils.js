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

export function getInitials(name = "") {
    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) return "?";

    const first = parts[0][0];
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";

    return (first + last).toUpperCase();
}
