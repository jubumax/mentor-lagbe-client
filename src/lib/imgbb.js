const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;              // 5 MB


export function validateImageFile(file) {
    if (!ALLOWED_TYPES.includes(file.type)) {
        return "Choose a JPG, PNG, WebP or GIF image.";
    }
    if (file.size > MAX_IMAGE_SIZE) {
        return "The image must be 5 MB or smaller.";
    }
    return null;
}


export async function uploadToImgbb(file) {
    const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!key) {
        throw new Error(
            "Image upload is not set up. Add NEXT_PUBLIC_IMGBB_API_KEY to .env.local."
        );
    }

    const body = new FormData();
    body.append("image", file);

    let response;
    try {
        response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
            method: "POST",
            body,
        });
    } catch {
        throw new Error("Could not reach the image service. Check your connection.");
    }

    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success) {
        throw new Error(result?.error?.message ?? "Image upload failed. Please try again.");
    }

    return result.data.display_url ?? result.data.url;
}