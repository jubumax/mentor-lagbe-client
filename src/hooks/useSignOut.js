"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";


export function useSignOut() {
    const router = useRouter();
    const { signOut } = useAuth();

    return useCallback(async () => {
        try {
            await signOut();
            toast.success("You have been signed out.");
            router.push("/");
        } catch {
            toast.error("Could not sign out. Please try again.");
        }
    }, [signOut, router]);
}