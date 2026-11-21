"use client";

import Logo from "@/components/ui/Logo";
import ErrorState from "@/components/layout/ErrorState";

// Fallback for errors in areas without their own error page (auth, dashboard)
export default function GlobalRouteError({ error, reset }) {
    return (
        <div className="flex flex-1 flex-col">
            <header className="px-4 py-6 sm:px-8">
                <Logo />
            </header>

            <ErrorState error={error} reset={reset} />
        </div>
    );
}