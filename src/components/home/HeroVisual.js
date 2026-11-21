import { Atom, Check, Code, Sigma, Star } from "lucide-react";
import { cn } from "@/lib/utils";


function SubjectTile({ icon: Icon, label, className, delay }) {
    return (
        <div className={cn("absolute", className)}>
            <div
                className="animate-float flex items-center gap-2 rounded-2xl bg-surface px-3 py-2.5 shadow-card"
                style={{ animationDelay: delay }}
            >
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary-soft text-link">
                    <Icon className="size-[18px]" />
                </span>

                <span className="pr-1 text-sm font-semibold text-ink">{label}</span>
            </div>
        </div>
    );
}


export default function HeroVisual() {
    return (
        <div
            className="relative mx-auto aspect-square w-full max-w-[34rem]"
            aria-hidden="true"
        >
            <div className="absolute inset-[6%] rounded-[2.5rem] bg-linear-to-br from-primary to-footer-from" />
            <div className="absolute inset-[6%] rounded-[2.5rem] opacity-25 [background-image:radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="absolute -right-2 top-[4%] size-32 rounded-full bg-accent/70 blur-3xl" />

            <SubjectTile
                icon={Sigma}
                label="Maths"
                className="left-[1%] top-[16%]"
                delay="0s"
            />

            <SubjectTile
                icon={Atom}
                label="Physics"
                className="right-[1%] top-[34%] hidden sm:block"
                delay="1.2s"
            />

            <SubjectTile
                icon={Code}
                label="Coding"
                className="bottom-[12%] left-[5%] hidden sm:block"
                delay="2.4s"
            />

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[64%] rounded-3xl bg-surface p-4 shadow-card sm:p-5">
                    <div className="flex items-center gap-3">
                        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-on">
                            RH
                        </span>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-ink">HSC Physics Batch</p>
                            <p className="truncate text-xs text-muted">with Rafiq Hasan</p>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {["Sun", "Tue", "Thu"].map((day) => (
                            <span
                                key={day}
                                className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-muted"
                            >
                                {day}
                            </span>
                        ))}
                    </div>

                    <div className="mt-4">
                        <div className="mb-1.5 flex justify-between text-xs font-medium text-muted">
                            <span>Seats filled</span>
                            <span>14 / 20</span>
                        </div>

                        <div className="h-2 rounded-full bg-surface-2">
                            <div className="h-full w-[70%] rounded-full bg-primary" />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-lg font-extrabold text-ink">
                            ৳ 2,500<span className="text-xs font-medium text-muted"> /month</span>
                        </p>
                        <span className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-link">
                            Online
                        </span>
                    </div>
                </div>
            </div>

            <div
                className="animate-float absolute right-[3%] top-[5%] hidden items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-sm font-bold text-accent-on shadow-card sm:flex"
                style={{ animationDelay: "0.6s" }}
            >
                <Star className="size-4 fill-current" />
                4.9 tutor rating
            </div>

            <div
                className="animate-float absolute bottom-[6%] right-[6%] hidden items-center gap-2 rounded-2xl bg-surface px-3.5 py-2.5 shadow-card sm:flex"
                style={{ animationDelay: "1.8s" }}
            >
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-success text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                </span>

                <span className="text-sm font-semibold text-ink">Application accepted</span>
            </div>
        </div>
    );
}