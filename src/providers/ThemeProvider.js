"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useSyncExternalStore,
} from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme-script";

const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => { },
});

function subscribe(onChange) {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
    });
    return () => observer.disconnect();
}

const getSnapshot = () =>
    document.documentElement.classList.contains("dark") ? "dark" : "light";

const getServerSnapshot = () => "light";

export function ThemeProvider({ children }) {
    const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const toggleTheme = useCallback(() => {
        const next = getSnapshot() === "dark" ? "light" : "dark";
        document.documentElement.classList.toggle("dark", next === "dark");
        try {
            localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
            // storage can be blocked (private mode) -- the theme still switches!
        }
    }, []);

    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    return useContext(ThemeContext);
}