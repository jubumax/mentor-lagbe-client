import { cn } from "@/lib/utils";

const TONES = {
    primary: "bg-primary-soft text-link",
    success: "bg-success-soft text-success",
    accent: "bg-accent-soft text-accent-ink",
    danger: "bg-danger-soft text-danger",
};


export default function StatCard({ label, value, hint, icon: Icon, tone = "primary" }) {
    return (
        <div className="rounded-card border border-line bg-surface p-5 shadow-card">
            <div className="flex items-start justify-between gap-3">

                <p className="text-sm font-medium text-muted">{label}</p>

                {Icon && (
                    <span
                        className={cn(
                            "inline-flex size-10 shrink-0 items-center justify-center rounded-xl",
                            TONES[tone]
                        )}
                    >
                        <Icon className="size-5" aria-hidden="true" />
                    </span>
                )}
            </div>

            <p className="mt-3 font-display text-4xl font-extrabold text-ink">{value}</p>

            {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
        </div>
    );
}