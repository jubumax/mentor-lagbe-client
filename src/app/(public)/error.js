"use client";

import ErrorState from "@/components/layout/ErrorState";

export default function PublicError({ error, reset }) {
    return <ErrorState error={error} reset={reset} />;
}