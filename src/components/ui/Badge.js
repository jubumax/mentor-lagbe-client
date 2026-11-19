import { cn } from "@/lib/utils";

const tones = {
    neutral: "bg-surface-2 text-muted",
    primary: "bg-primary-soft text-link",
    accent: "bg-accent-soft text-accent-ink",
    success: "bg-success-soft text-success",
    danger: "bg-danger-soft text-danger",
};

export default function Badge({ tone = "neutral", icon: Icon, className, children }) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                tones[tone],
                className
            )}
        >
            {Icon && <Icon className="size-3.5" aria-hidden="true" />}
            {children}
        </span>
    );
}