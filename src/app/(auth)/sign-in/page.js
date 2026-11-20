import { Suspense } from "react";
import SignInForm from "@/components/auth/SignInForm";
import Skeleton from "@/components/ui/Skeleton";

export const metadata = { title: "Sign in" };

export default function SignInPage() {
    return (
        <>
            <h1 className="text-3xl">Welcome back</h1>

            <p className="mb-7 mt-2 text-muted">
                Sign in to manage your tuitions and applications.
            </p>
            
            <Suspense fallback={<Skeleton className="h-72 w-full" />}>
                <SignInForm />
            </Suspense>
        </>
    );
}