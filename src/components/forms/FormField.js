import { cn } from "@/lib/utils";

export const controlClass = (hasError) =>
    cn(
        "w-full rounded-control border bg-surface px-3.5 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:ring-4",
        hasError
            ? "border-danger focus:ring-danger/15"
            : "border-line hover:border-primary/40 focus:border-primary focus:ring-primary/15"
    );

export default function FormField({
    id,
    label,
    required,
    hint,
    error,
    className,
    children,
}) {
    return (
        <div className={cn("space-y-1.5", className)}>
            {label && (
                <label htmlFor={id} className="block text-sm font-semibold text-ink">
                    {label}
                    {required && <span className="text-danger"> *</span>}
                </label>
            )}
            {children}
            {error ? (
                <p id={`${id}-error`} role="alert" className="text-xs font-medium text-danger">
                    {error}
                </p>
            ) : hint ? (
                <p className="text-xs text-muted">{hint}</p>
            ) : null}
        </div>
    );
}