"use client";

import { ShieldAlert } from "lucide-react";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { useAuth } from "@/hooks/useAuth";
import { getDashboardPath } from "@/lib/dashboard";


// Used inside the dashboard, where the person is already known to be signed in.

export default function RoleGuard({ allow, children }) {
    const { role } = useAuth();
    const allowed = Array.isArray(allow) ? allow : [allow];

    if (!allowed.includes(role)) {
        return (
            <EmptyState
                icon={ShieldAlert}
                title="You don't have access to this page"
                description={`This area is only for ${allowed.join(" or ")} accounts.`}
            >
                <Button href={getDashboardPath(role)}>Go to my dashboard</Button>
            </EmptyState>
        );
    }

    return children;
}