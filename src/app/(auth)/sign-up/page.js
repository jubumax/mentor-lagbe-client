import { Suspense } from "react";
import SignUpForm from "@/components/auth/SignUpForm";
import Skeleton from "@/components/ui/Skeleton";

export const metadata = { title: "Create your account" };

export default function SignUpPage() {
    return (
        <>
            <h1 className="text-3xl">Create your account</h1>

            <p className="mb-7 mt-2 text-muted">
                Join <span className="hover:text-blue-500">MentorLagbe</span> as a student or a tutor.
            </p>
            
            <Suspense fallback={<Skeleton className="h-96 w-full" />}>
                <SignUpForm />
            </Suspense>
        </>
    );
}