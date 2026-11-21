"use client";

import { useState } from "react";
import Link from "next/link";
import { ClipboardList, CloudOff, Search } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import StatusBadge from "@/components/ui/StatusBadge";
import { useApi } from "@/hooks/useApi";
import { api, ApiError } from "@/lib/api";
import { cn, formatDate } from "@/lib/utils";


const TABS = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "accepted", label: "Accepted" },
    { key: "rejected", label: "Rejected" },
];

export default function MyApplications() {
    const { data, error, isLoading, reload } = useApi("/applications/mine");
    const [tab, setTab] = useState("all");
    const [target, setTarget] = useState(null);
    const [cancelling, setCancelling] = useState(false);

    const applications = data?.applications ?? [];
    const countFor = (key) =>
        key === "all"
            ? applications.length
            : applications.filter((item) => item.status === key).length;
    const rows =
        tab === "all" ? applications : applications.filter((item) => item.status === tab);


    async function confirmCancel() {
        setCancelling(true);
        try {
            const result = await api.delete(`/applications/${target._id}`);
            toast.success(result?.message ?? "Application cancelled.");

            setTarget(null);
            reload();

        } catch (cancelError) {
            toast.error(
                cancelError instanceof ApiError
                    ? cancelError.message
                    : "Could not cancel the application."
            );

            if (cancelError.status === 404 || cancelError.status === 409) {
                setTarget(null);
                reload();
            }

        } finally {
            setCancelling(false);
        }
    }

    const columns = [
        {
            key: "tuition",
            header: "Tuition",
            render: (row) => (
                <div className="min-w-0">
                    <Link
                        href={`/tuitions/${row.tuitionId}`}
                        className="line-clamp-1 font-semibold text-ink hover:text-link"
                    >
                        {row.tuitionTitle}
                    </Link>

                    <p className="text-xs text-muted">{row.subject}</p>
                </div>
            ),
        },
        { key: "tutorName", header: "Tutor", className: "text-muted" },
        {
            key: "preferredSchedule",
            header: "Preferred schedule",
            className: "text-muted",
        },
        {
            key: "createdAt",
            header: "Applied on",
            className: "whitespace-nowrap text-muted",
            render: (row) => formatDate(row.createdAt),
        },
        {
            key: "status",
            header: "Status",
            render: (row) => <StatusBadge status={row.status} />,
        },
        {
            key: "actions",
            header: "Action",
            headerClassName: "text-right",
            className: "text-right",
            render: (row) =>
                row.status === "pending" ? (
                    <button
                        type="button"
                        onClick={() => setTarget(row)}
                        className="h-9 rounded-control px-3 text-sm font-semibold text-danger transition-colors hover:bg-danger-soft"
                    >
                        Cancel
                    </button>
                ) : (
                    <span className="text-muted" aria-label="No actions available">
                        -
                    </span>
                ),
        },
    ];

    const emptyState =
        applications.length === 0 ? (
            <EmptyState
                icon={ClipboardList}
                title="No applications yet"
                description="When you apply for a tuition, it will show up here with its status."
            >
                <Button href="/tuitions" variant="outline">
                    <Search className="size-4" aria-hidden="true" />
                    Find a tuition
                </Button>

            </EmptyState>
        ) : (
            <EmptyState
                icon={ClipboardList}
                title={`No ${tab} applications`}
                description="Try another tab to see the rest of your applications."
            />
        );

    return (
        <div>
            <PageHeader
                title="My applications"
                description="Every tuition you have applied for, and where each request stands."
            />

            {error ? (
                <EmptyState
                    icon={CloudOff}
                    title="We couldn't load your applications"
                    description={error.message}
                >
                    <Button variant="outline" onClick={reload}>
                        Try again
                    </Button>
                </EmptyState>
            ) : isLoading && !data ? (
                <div className="space-y-3">
                    <Skeleton className="h-11 w-80 max-w-full rounded-full" />
                    <Skeleton className="h-80 w-full rounded-card" />
                </div>
            ) : (
                <>
                    <div
                        role="group"
                        aria-label="Filter by status"
                        className="mb-5 inline-flex max-w-full flex-wrap gap-1 rounded-full border border-line bg-surface p-1"
                    >
                        {TABS.map(({ key, label }) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setTab(key)}
                                aria-pressed={tab === key}
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                                    tab === key
                                        ? "bg-primary text-on-primary"
                                        : "text-muted hover:text-ink"
                                )}
                            >
                                {label}
                                <span
                                    className={cn(
                                        "rounded-full px-2 py-0.5 text-xs",
                                        tab === key ? "bg-white/20" : "bg-surface-2"
                                    )}
                                >
                                    {countFor(key)}
                                </span>
                            </button>
                        ))}
                    </div>

                    <DataTable
                        columns={columns}
                        rows={rows}
                        getRowKey={(row) => row._id}
                        empty={emptyState}
                    />
                </>
            )}

            <ConfirmDialog
                open={Boolean(target)}
                title="Cancel this application?"
                description={target?.tuitionTitle}
                confirmLabel="Yes, cancel it"
                cancelLabel="Keep application"
                loading={cancelling}
                onConfirm={confirmCancel}
                onClose={() => !cancelling && setTarget(null)}
            />
        </div>
    );
}