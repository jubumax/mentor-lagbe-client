"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { getDashboardPath } from "@/lib/dashboard";


// /dashboard sends each person to the home of their own role

export default function DashboardIndexPage() {
    const router = useRouter();
    const { role } = useAuth();

    useEffect(() => {
        if (role) router.replace(getDashboardPath(role));
    }, [role, router]);

    return (
        <div className="flex justify-center py-24">
            <Spinner className="size-6 text-primary" />
        </div>
    );
}