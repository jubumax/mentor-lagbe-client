"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, CircleAlert, Crown } from "lucide-react";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { SITE } from "@/lib/constants";
import { getDashboardPath } from "@/lib/dashboard";
import { formatDate, formatUsd } from "@/lib/utils";


function Panel({ children }) {
    return (
        <div className="w-full max-w-md rounded-card border border-line bg-surface p-8 text-center shadow-card">
            {children}
        </div>
    );
}


export default function PaymentSuccess() {
    const sessionId = useSearchParams().get("session_id");
    const { isAuthenticated, isLoading, role, refetch } = useAuth();

    const [result, setResult] = useState({ status: "verifying", payment: null, message: "" });
    const started = useRef(false);

    useEffect(() => {
        if (isLoading || !isAuthenticated || !sessionId || started.current) return;
        started.current = true;

        api
            .post("/payments/verify", { sessionId })
            .then((data) => {
                setResult({ status: "success", payment: data.payment, message: "" });
                refetch();
            })
            .catch((error) => {
                setResult({ status: "error", payment: null, message: error.message });
            });
    }, [isLoading, isAuthenticated, sessionId, refetch]);


    if (!sessionId) {
        return (
            <Panel>
                <h1 className="text-2xl">No payment to confirm</h1>
                <p className="mt-3 text-sm text-muted">
                    This page opens after a payment on Stripe. You can compare plans on the pricing page.
                </p>
                <Button href="/pricing" className="mt-6">
                    Go to pricing
                </Button>
            </Panel>
        );
    }

    if (!isLoading && !isAuthenticated) {
        return (
            <Panel>
                <h1 className="text-2xl">Please sign in</h1>

                <p className="mt-3 text-sm text-muted">
                    Sign in to the account you paid with and we will confirm your payment.
                </p>

                <Button
                    href={`/sign-in?redirect=${encodeURIComponent(`/payment/success?session_id=${sessionId}`)}`}
                    className="mt-6"
                >
                    Sign in
                </Button>
            </Panel>
        );
    }

    if (isLoading || result.status === "verifying") {
        return (
            <Panel>
                <div role="status" className="flex flex-col items-center gap-4 py-4">
                    <Spinner className="size-8 text-primary" />
                    <h1 className="text-2xl">Confirming your payment</h1>
                    <p className="text-sm text-muted">This only takes a moment. Please don&apos;t close this page.</p>
                </div>
            </Panel>
        );
    }

    if (result.status === "error") {
        return (
            <Panel>
                <span className="mx-auto mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-danger-soft text-danger">
                    <CircleAlert className="size-7" aria-hidden="true" />
                </span>

                <h1 className="text-2xl">We couldn&apos;t confirm the payment</h1>
                <p className="mt-3 text-sm text-muted">{result.message}</p>

                <p className="mt-2 text-xs text-muted">
                    If money left your account, write to{" "}
                    <a href={`mailto:${SITE.email}`} className="font-semibold text-link hover:underline">
                        {SITE.email}
                    </a>{" "}
                    and we will sort it out.
                </p>

                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button onClick={() => window.location.reload()}>Try again</Button>

                    <Button href="/pricing" variant="outline">
                        Back to pricing
                    </Button>
                </div>
            </Panel>
        );
    }

    const { payment } = result;
    const details = [
        ["Plan", payment.planName],
        ["Amount paid", formatUsd(payment.amount)],
        ["Transaction ID", payment.transactionId],
        ["Date", formatDate(payment.paidAt)],
    ];


    return (
        <Panel>

            <span className="mx-auto mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-success-soft text-success">
                <CheckCircle2 className="size-7" aria-hidden="true" />
            </span>

            <h1 className="text-3xl">Payment successful</h1>

            <p className="mt-3 flex items-center justify-center gap-2 text-sm text-muted">
                <Crown className="size-4 text-accent-ink" aria-hidden="true" />
                Your account is now on the Pro plan.
            </p>

            <dl className="mt-6 divide-y divide-line rounded-control border border-line text-left text-sm">
                {details.map(([label, value]) => (
                    <div key={label} className="flex items-start justify-between gap-4 p-3">
                        <dt className="shrink-0 text-muted">{label}</dt>
                        <dd className="min-w-0 break-all text-right font-semibold text-ink">{value}</dd>
                    </div>
                ))}
            </dl>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href={getDashboardPath(role)}>Go to your dashboard</Button>
                <Button href="/" variant="outline">
                    Back to home
                </Button>
            </div>

        </Panel>
    );
}