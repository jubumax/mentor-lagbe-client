import { Suspense } from "react";
import PaymentSuccess from "@/components/pricing/PaymentSuccess";
import Skeleton from "@/components/ui/Skeleton";

export const metadata = { title: "Payment successful" };

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<Skeleton className="h-72 w-full max-w-md rounded-card" />}>
            <PaymentSuccess />
        </Suspense>
    );
}