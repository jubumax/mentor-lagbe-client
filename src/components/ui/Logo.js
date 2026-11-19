import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }) {
    return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
            <rect width="40" height="40" rx="12" fill="currentColor" />
            <path
                d="M10.5 28V15.2c0-.9 1.1-1.4 1.8-.7L20 21.8l7.7-7.3c.7-.7 1.8-.2 1.8.7V28"
                fill="none"
                stroke="var(--logo-fg, #fff)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="31" cy="9" r="3.4" fill="#f5a524" />
        </svg>
    );
}

export default function Logo({ light = false, className }) {
    return (
        <Link
            href="/"
            aria-label="MentorLagbe home"
            className={cn("inline-flex items-center gap-2.5", className)}
        >
            <LogoMark
                className={cn(
                    "size-9",
                    light ? "text-white [--logo-fg:#2d2896]" : "text-primary"
                )}
            />
            <span
                className={cn(
                    "font-display text-[1.35rem] font-extrabold tracking-tight",
                    light ? "text-white" : "text-ink"
                )}
            >
                MentorLagbe
            </span>
        </Link>
    );
}