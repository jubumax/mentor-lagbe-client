"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/hooks/useAuth";
import { ROLES } from "@/lib/constants";

// Only students can apply. Everyone else sees why the button is unavailable.
export default function ApplyPanel({ tuitionId, title }) {
    const { isAuthenticated, isLoading, role } = useAuth();
    const [open, setOpen] = useState(false);

    if (isLoading) {
        return <span className="block h-12 animate-pulse rounded-control bg-surface-2" />;
    }

    if (!isAuthenticated) {
        return (
            <div className="space-y-3">
                <Button
                    href={`/sign-in?redirect=${encodeURIComponent(`/tuitions/${tuitionId}`)}`}
                    size="lg"
                    className="w-full"
                >
                    Sign in to apply
                </Button>

                <p className="text-center text-xs text-muted">
                    Only student accounts can apply for a tuition.
                </p>
            </div>
        );
    }

    if (role !== ROLES.STUDENT) {
        return (
            <div className="space-y-3">
                <Button size="lg" className="w-full" disabled>
                    Apply now
                </Button>

                <p className="flex items-start gap-2 rounded-control bg-surface-2 p-3 text-xs leading-relaxed text-muted">
                    <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />

                    Only student accounts can apply. You are signed in as a {role}.
                </p>
            </div>
        );
    }


    return (
        <>
            <Button size="lg" className="w-full" onClick={() => setOpen(true)}>
                Apply now
            </Button>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title="Apply for tuition"
                description={title}
            >
                <p className="text-sm text-muted">
                    The application form is added in the next step.
                </p>
            </Modal>
        </>
    );
}