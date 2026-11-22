"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import PlanCard from "@/components/pricing/PlanCard";
import ProPlanAction from "@/components/pricing/ProPlanAction";
import { useAuth } from "@/hooks/useAuth";
import { PLANS } from "@/data/plans";
import { cn } from "@/lib/utils";


export default function PricingPlans({ initialAudience = "tutor" }) {
    const { isAuthenticated, role } = useAuth();
    const [choice, setChoice] = useState(null);

    const audience = choice ?? (role === "student" ? "student" : initialAudience);
    const { free, pro } = PLANS[audience];

    return (
        <div>
            <div
                role="tablist"
                aria-label="Choose your role"
                className="mx-auto flex w-fit rounded-full border border-line bg-surface p-1"
            >
                {Object.entries(PLANS).map(([key, { label }]) => (
                    <button
                        key={key}
                        type="button"
                        role="tab"
                        id={`plan-tab-${key}`}
                        aria-selected={audience === key}
                        aria-controls="plan-panel"
                        onClick={() => setChoice(key)}
                        className={cn(
                            "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                            audience === key
                                ? "bg-primary text-on-primary"
                                : "text-muted hover:text-ink"
                        )}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div
                id="plan-panel"
                role="tabpanel"
                aria-labelledby={`plan-tab-${audience}`}
                key={audience}
                className="animate-rise mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2"
            >
                <PlanCard
                    plan={free}
                    action={
                        isAuthenticated ? (
                            <Button href="/dashboard" variant="outline" size="lg" className="w-full">
                                Go to your dashboard
                            </Button>
                        ) : (
                            <Button href="/sign-up" variant="outline" size="lg" className="w-full">
                                Get started free
                            </Button>
                        )
                    }
                />

                <PlanCard plan={pro} highlighted action={<ProPlanAction audience={audience} />} />
            </div>
        </div>
    );
}