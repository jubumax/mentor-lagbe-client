import Link from "next/link";
import { cn } from "@/lib/utils";
import Spinner from "@/components/ui/Spinner";

const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-control font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-55";

const variants = {
    primary:
        "bg-primary text-on-primary shadow-[0_8px_20px_-8px_var(--primary)] hover:-translate-y-0.5 hover:bg-primary-hover",
    accent: "bg-accent text-accent-on hover:-translate-y-0.5 hover:brightness-95",
    soft: "bg-primary-soft text-link hover:brightness-95",
    outline:
        "border border-line bg-surface text-ink hover:border-primary hover:text-link",
    ghost: "text-ink hover:bg-surface-2",
    danger: "bg-danger-solid text-white hover:brightness-110",
};

const sizes = {
    sm: "h-9 px-3.5 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-13 px-7 text-base",
};

export default function Button({
    variant = "primary",
    size = "md",
    href,
    loading = false,
    disabled,
    type = "button",
    className,
    children,
    ...props
}) {
    const classes = cn(base, variants[variant], sizes[size], className);

    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <Spinner className="size-4" />}
            {children}
        </button>
    );
}