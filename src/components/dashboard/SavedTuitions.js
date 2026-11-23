"use client";

import { Bookmark, CloudOff } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import TuitionCard from "@/components/tuition/TuitionCard";
import TuitionCardSkeleton from "@/components/tuition/TuitionCardSkeleton";
import { useApi } from "@/hooks/useApi";
import { useBookmarks } from "@/hooks/useBookmarks";

export default function SavedTuitions() {
    const { data, error, isLoading, reload } = useApi("/bookmarks");
    const { ids, isReady } = useBookmarks();

    const fetched = data?.tuitions ?? [];
    const tuitions = isReady ? fetched.filter((item) => ids.includes(item._id)) : fetched;

    return (
        <div>
            <PageHeader
                title="Saved tuitions"
                description="Tuitions you bookmarked to look at again. Tuitions that were closed or removed no longer appear here."
                actions={
                    <Button href="/tuitions" variant="outline">
                        Browse tuitions
                    </Button>
                }
            />

            {error ? (
                <EmptyState
                    icon={CloudOff}
                    title="We couldn't load your saved tuitions"
                    description={error.message}
                >
                    <Button variant="outline" onClick={reload}>
                        Try again
                    </Button>
                </EmptyState>
            ) : isLoading && !data ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 3 }, (_, index) => (
                        <TuitionCardSkeleton key={index} />
                    ))}
                </div>
            ) : tuitions.length === 0 ? (
                <EmptyState
                    icon={Bookmark}
                    title="No saved tuitions yet"
                    description="Tap the bookmark icon on any tuition to keep it here."
                >
                    <Button href="/tuitions">Find a tuition</Button>
                </EmptyState>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {tuitions.map((tuition) => (
                        <TuitionCard key={tuition._id} tuition={tuition} />
                    ))}
                </div>
            )}
        </div>
    );
}