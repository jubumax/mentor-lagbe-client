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


export function formatFee(amount) {
    const number = Number(amount);
    return `৳${(Number.isFinite(number) ? number : 0).toLocaleString("en-US")}`;
}


export function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}


// Stripe payments and Pro plans are in US dollars! (e.g. 15 => $15)
export function formatUsd(amount) {
    const number = Number(amount);
    return `$${(Number.isFinite(number) ? number : 0).toLocaleString("en-US", {
        maximumFractionDigits: 2,
    })}`;
}