import { cn } from "@/lib/utils";

export default function SectionHeading({
    title,
    description,
    eyebrow,
    align = "center",
    className,
}) {
    return (
        <div
            className={cn(
                "max-w-2xl",
                align === "center" && "mx-auto text-center",
                className
            )}
        >
            {eyebrow && (
                <p className="mb-3 inline-flex rounded-full bg-primary-soft px-3 py-1 text-sm font-semibold text-link">
                    {eyebrow}
                </p>
            )}
            <h2 className="text-3xl sm:text-4xl">{title}</h2>
            {description && (
                <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                    {description}
                </p>
            )}
        </div>
    );
}