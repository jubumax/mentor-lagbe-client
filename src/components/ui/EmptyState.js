import { cn } from "@/lib/utils";

export default function EmptyState({ icon: Icon, title, description, children, className }) {
    return (
        <div
            className={cn(
                "flex flex-col items-center rounded-card border border-dashed border-line bg-surface px-6 py-14 text-center",
                className
            )}
        >
            {Icon && (
                <span className="mb-4 inline-flex size-14 items-center justify-center rounded-full bg-primary-soft text-link">
                    <Icon className="size-6" aria-hidden="true" />
                </span>
            )}

            <h3 className="text-xl">{title}</h3>

            {description && (
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{description}</p>
            )}

            {children && <div className="mt-6">{children}</div>}
        </div>
    );
}