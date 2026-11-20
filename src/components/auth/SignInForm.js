"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/forms/PasswordInput";
import GoogleButton from "@/components/auth/GoogleButton";
import { authClient } from "@/lib/auth-client";
import { ENABLE_GOOGLE_LOGIN } from "@/lib/constants";
import { getSafeRedirect } from "@/lib/utils";
import { validateSignIn } from "@/lib/validators";


export default function SignInForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = getSafeRedirect(searchParams.get("redirect"));

    const [values, setValues] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setValues((previous) => ({ ...previous, [name]: value }));

        if (errors[name]) {
            setErrors((previous) => ({ ...previous, [name]: undefined }));
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const nextErrors = validateSignIn(values);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        setLoading(true);
        try {
            const { data, error } = await authClient.signIn.email({
                email: values.email.trim(),
                password: values.password,
            });

            if (error) {
                toast.error(error.message || "Incorrect email or password.");
                return;
            }

            const firstName = data?.user?.name?.split(" ")[0];
            toast.success(firstName ? `Welcome back, ${firstName}!` : "Welcome back!");
            router.push(redirectTo);

        } catch {
            toast.error("Something went wrong. Please check your connection.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="space-y-5">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <Input
                    label="Email address"
                    name="email"
                    type="email"
                    icon={Mail}
                    placeholder="name@example.com"
                    autoComplete="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                
                <PasswordInput
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    value={values.password}
                    onChange={handleChange}
                    error={errors.password}
                />

                <Button type="submit" size="lg" loading={loading} className="w-full">
                    Sign in
                </Button>
            </form>

            {ENABLE_GOOGLE_LOGIN && (
                <>
                    <div className="flex items-center gap-3 text-xs font-medium text-muted">
                        <span className="h-px flex-1 bg-line" />
                        or
                        <span className="h-px flex-1 bg-line" />
                    </div>
                    
                    <GoogleButton redirectTo={redirectTo} />
                </>
            )}

            <p className="text-center text-sm text-muted">
                New to MentorLagbe?{" "}
                <Link href="/sign-up" className="font-semibold text-link hover:underline">
                    Create an account
                </Link>
            </p>
        </div>
    );
}