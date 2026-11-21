"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const outlineOnDark =
    "inline-flex h-13 items-center justify-center rounded-control border border-white/40 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10";


export default function CtaActions() {
    const { isAuthenticated, isLoading } = useAuth();

    return (
        <div
            className={cn(
                "relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row",
                isLoading && "invisible"
            )}
        >
            {isAuthenticated ? (
                <>
                    <Button href="/dashboard" variant="accent" size="lg">
                        Go to your dashboard
                    </Button>

                    <Link href="/tuitions" className={outlineOnDark}>
                        Browse tuitions
                    </Link>
                </>
            ) : (
                <>
                    <Button href="/sign-up" variant="accent" size="lg">
                        Join as a student
                    </Button>

                    <Link href="/sign-up?role=tutor" className={outlineOnDark}>
                        Become a tutor
                    </Link>
                </>
            )}
        </div>
    );
}