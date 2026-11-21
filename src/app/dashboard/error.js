"use client";

import ErrorState from "@/components/layout/ErrorState";

export default function DashboardError({ error, reset }) {
    return <ErrorState error={error} reset={reset} />;
}