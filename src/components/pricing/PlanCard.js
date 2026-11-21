import { Check } from "lucide-react";
import { cn } from "@/lib/utils";


export default function PlanCard({ plan, highlighted = false, action }) {
    const { name, price, blurb, features } = plan;

    return (
        <div
            className={cn(
                "relative flex h-full flex-col rounded-card p-7 sm:p-8",
                highlighted
                    ? "bg-linear-to-br from-primary to-footer-from text-white shadow-card"
                    : "border border-line bg-surface shadow-card"
            )}
        >
            {highlighted && (
                <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-on">
                    Recommended
                </span>
            )}

            <h3 className={cn("text-xl", highlighted && "text-white")}>{name}</h3>
            <p className={cn("mt-2 text-sm", highlighted ? "text-white/80" : "text-muted")}>
                {blurb}
            </p>

            <p className="mt-6 flex items-baseline gap-2">
                <span
                    className={cn(
                        "font-display text-5xl font-extrabold",
                        highlighted ? "text-white" : "text-ink"
                    )}
                >
                    ৳ {price}
                </span>

                <span className={cn("text-sm", highlighted ? "text-white/70" : "text-muted")}>
                    {price === 0 ? "free forever" : "one-time payment"}
                </span>
            </p>

            <ul className="mt-7 flex-1 space-y-3.5">
                {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                        <span
                            className={cn(
                                "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full",
                                highlighted ? "bg-accent text-accent-on" : "bg-success-soft text-success"
                            )}
                        >
                            <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                        </span>

                        <span className={highlighted ? "text-white/90" : "text-ink"}>{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-8">{action}</div>
        </div>
    );
}