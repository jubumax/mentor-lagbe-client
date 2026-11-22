import { CircleX } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata = { title: "Payment cancelled" };

export default function PaymentCancelPage() {
    return (
        <div className="w-full max-w-md rounded-card border border-line bg-surface p-8 text-center shadow-card">
            <span className="mx-auto mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-accent-soft text-accent-ink">
                <CircleX className="size-7" aria-hidden="true" />
            </span>

            <h1 className="text-3xl">Payment cancelled</h1>

            <p className="mt-3 text-sm text-muted">
                You were not charged. Your account stays on its current plan, and you can
                upgrade whenever you are ready.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="/pricing">Back to pricing</Button>
                <Button href="/dashboard" variant="outline">
                    Go to your dashboard
                </Button>
            </div>
        </div>
    );
}