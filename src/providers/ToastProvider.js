"use client";

import { Toaster } from "sonner";
import { useTheme } from "@/providers/ThemeProvider";

export default function ToastProvider() {
    const { theme } = useTheme();

    return (
        <Toaster
            theme={theme}
            position="top-right"
            closeButton
            richColors
            toastOptions={{
                style: { fontFamily: "var(--font-dm-sans), sans-serif" },
            }}
        />
    );
}