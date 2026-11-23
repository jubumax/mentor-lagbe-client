"use client";

import { Bookmark } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useBookmarks } from "@/hooks/useBookmarks";
import { ROLES } from "@/lib/constants";
import { cn } from "@/lib/utils";


export default function BookmarkButton({ tuitionId, variant = "icon", className }) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, isLoading, role } = useAuth();
    const { isSaved, toggle } = useBookmarks();

    // Tutors and admins cannot save tuitions
    if (isLoading || (isAuthenticated && role !== ROLES.STUDENT)) return null;

    const saved = isAuthenticated && isSaved(tuitionId);

    function handleClick(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!isAuthenticated) {
            router.push(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
            return;
        }
        toggle(tuitionId);
    }

    if (variant === "full") {
        return (
            <Button
                variant={saved ? "soft" : "outline"}
                size="lg"
                className={cn("w-full", className)}
                onClick={handleClick}
                aria-pressed={saved}
            >
                <Bookmark className={cn("size-5", saved && "fill-current")} aria-hidden="true" />
                {saved ? "Saved" : "Save tuition"}
            </Button>
        );
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-pressed={saved}
            aria-label={saved ? "Remove from saved tuitions" : "Save tuition"}
            className={cn(
                "inline-flex size-9 items-center justify-center rounded-full bg-surface/90 text-ink backdrop-blur transition-transform hover:scale-105",
                saved && "text-link",
                className
            )}
        >
            <Bookmark className={cn("size-[18px]", saved && "fill-current")} aria-hidden="true" />
        </button>
    );
}