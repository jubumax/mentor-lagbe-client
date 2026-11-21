"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Info } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import ApplyForm from "@/components/tuition/ApplyForm";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { ROLES } from "@/lib/constants";

// Only students can apply. Everyone else sees why the button is unavailable.
export default function ApplyPanel({ tuitionId, title }) {
    const { isAuthenticated, isLoading, role } = useAuth();
    const [open, setOpen] = useState(false);

    const [applicationStatus, setApplicationStatus] = useState(null);

    const isStudent = isAuthenticated && role === ROLES.STUDENT;

    // Find out whether this student has already applied
    useEffect(() => {
        if (!isStudent) return;

        let cancelled = false;
        async function check() {
            try {
                const data = await api.get(`/applications/check/${tuitionId}`);
                if (!cancelled) {
                    setApplicationStatus(data?.applied ? data.application.status : "none");
                }

            } catch {
                if (!cancelled) setApplicationStatus("none");
            }
        }
        check();

        return () => {
            cancelled = true;
        };
    }, [isStudent, tuitionId]);

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

    if (!isStudent) {
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


    if (applicationStatus === null) {
        return <span className="block h-12 animate-pulse rounded-control bg-surface-2" />;
    }

    if (applicationStatus !== "none") {
        return (
            <div className="space-y-3">
                <Button size="lg" className="w-full" disabled>
                    <CheckCircle2 className="size-5" aria-hidden="true" />
                    Already applied
                </Button>

                <div className="flex items-center justify-between gap-3 rounded-control bg-surface-2 p-3 text-sm">
                    <span className="text-muted">Your application</span>
                    <StatusBadge status={applicationStatus} />
                </div>

                <Link
                    href="/dashboard/student/my-applications"
                    className="block text-center text-sm font-semibold text-link hover:underline"
                >
                    View my applications
                </Link>
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
                <ApplyForm
                    tuitionId={tuitionId}
                    onApplied={(status) => {
                        setApplicationStatus(status);
                        setOpen(false);
                    }}
                    onCancel={() => setOpen(false)}
                />
            </Modal>
        </>
    );
}