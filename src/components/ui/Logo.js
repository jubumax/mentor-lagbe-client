import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }) {
    return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
            <rect width="40" height="40" rx="12" fill="currentColor" />
            <path
                d="M7 29V11l6.5 10L20 11v18"
                fill="none"
                stroke="var(--logo-fg, #fff)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M26 11v18h8"
                fill="none"
                stroke="#f5a524"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
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