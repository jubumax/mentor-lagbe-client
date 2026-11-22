"use client";

import { useState } from "react";
import { CheckCircle2, Info } from "lucide-react";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";

function Note({ children }) {
    return (
        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-white/80">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>{children}</span>
        </p>
    );
}

// The button on the Pro plan card -- sends the buyer to Stripe Checkout.
export default function ProPlanAction({ audience }) {
    const { isAuthenticated, isLoading, role, plan } = useAuth();
    const [loading, setLoading] = useState(false);

    async function handleCheckout() {
        setLoading(true);
        try {
            const data = await api.post("/payments/checkout");
            if (!data?.url) throw new Error("Stripe did not return a payment link.");
            window.location.href = data.url;
        } catch (error) {
            toast.error(error.message || "Could not start the payment. Please try again.");
            setLoading(false);
        }
    }

    if (isLoading) {
        return <span className="block h-13 animate-pulse rounded-control bg-white/20" />;
    }

    if (!isAuthenticated) {
        return (
            <>
                <Button
                    href={`/sign-in?redirect=${encodeURIComponent("/pricing")}`}
                    variant="accent"
                    size="lg"
                    className="w-full"
                >
                    Subscribe with Stripe
                </Button>
                <Note>You will be asked to sign in first.</Note>
            </>
        );
    }


    if (role === "admin") {
        return (
            <>
                <Button variant="accent" size="lg" className="w-full" disabled>
                    Subscribe with Stripe
                </Button>
                <Note>Admin accounts don&apos;t need a plan.</Note>
            </>
        );
    }

    if (role !== audience) {
        return (
            <>
                <Button variant="accent" size="lg" className="w-full" disabled>
                    Subscribe with Stripe
                </Button>
                <Note>
                    This plan is for {audience}s. You are signed in as a {role}, so choose the
                    {" "}{role} plan.
                </Note>
            </>
        );
    }

    if (plan === "pro") {
        return (
            <Button variant="accent" size="lg" className="w-full" disabled>
                <CheckCircle2 className="size-5" aria-hidden="true" />
                You&apos;re on Pro
            </Button>
        );
    }

    return (
        <Button
            variant="accent"
            size="lg"
            className="w-full"
            loading={loading}
            onClick={handleCheckout}
        >
            Subscribe with Stripe
        </Button>
    );
}