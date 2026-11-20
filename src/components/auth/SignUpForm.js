"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, User } from "lucide-react";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/forms/PasswordInput";
import RoleSelector from "@/components/forms/RoleSelector";
import { authClient } from "@/lib/auth-client";
import { ROLES } from "@/lib/constants";
import { PASSWORD_MIN_LENGTH, validateSignUp } from "@/lib/validators";


export default function SignUpForm() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const initialRole = searchParams.get("role") === ROLES.TUTOR ? ROLES.TUTOR : ROLES.STUDENT;

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        role: initialRole,
    });

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

        const nextErrors = validateSignUp(values);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        setLoading(true);
        try {
            const { error } = await authClient.signUp.email({
                name: values.name.trim(),
                email: values.email.trim(),
                password: values.password,
                role: values.role,
            });

            if (error) {
                toast.error(
                    error.message || "Could not create your account. Please try again."
                );
                return;
            }

            toast.success("Account created. Welcome to MentorLagbe!");
            router.push("/");
        } catch {
            toast.error("Something went wrong. Please check your connection.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <Input
                label="Full Name"
                name="name"
                icon={User}
                placeholder="Your full name"
                autoComplete="name"
                required
                value={values.name}
                onChange={handleChange}
                error={errors.name}
            />

            <Input
                label="Email Address"
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
                placeholder="At least 6 characters"
                autoComplete="new-password"
                required
                // hint={`Minimum ${PASSWORD_MIN_LENGTH} characters.`}
                value={values.password}
                onChange={handleChange}
                error={errors.password}
            />

            <RoleSelector value={values.role} onChange={handleChange} />

            <Button type="submit" size="lg" loading={loading} className="w-full">
                Create Account
            </Button>

            <p className="text-center text-sm text-muted">
                Already have an account?{" "}
                <Link href="/sign-in" className="font-semibold text-link hover:underline">
                    Sign in
                </Link>
            </p>

        </form>
    );
}