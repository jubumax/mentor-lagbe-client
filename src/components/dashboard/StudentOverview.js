"use client";

import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    ClipboardList,
    CircleCheck,
    Clock,
    CloudOff,
    Crown,
    FileText,
    Search,
    UserRound,
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import DataTable from "@/components/dashboard/DataTable";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import StatusBadge from "@/components/ui/StatusBadge";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/utils";


const QUICK_ACTIONS = [
    {
        label: "My applications",
        text: "Check the status of every request",
        href: "/dashboard/student/my-applications",
        icon: ClipboardList,
    },
    {
        label: "Browse tuitions",
        text: "Find a new tutor or batch",
        href: "/tuitions",
        icon: Search,
    },
    {
        label: "Update profile",
        text: "Keep your phone number current",
        href: "/dashboard/profile",
        icon: UserRound,
    },
];

const RECENT_COLUMNS = [
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
        key: "appliedAt",
        header: "Applied on",
        className: "whitespace-nowrap text-muted",
        render: (row) => formatDate(row.appliedAt),
    },
    {
        key: "status",
        header: "Status",
        render: (row) => <StatusBadge status={row.status} />,
    },
];

function StatsSkeleton() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="h-32 rounded-card" />
            ))}
        </div>
    );
}


export default function StudentOverview() {
    const { user, plan } = useAuth();
    const { data, error, isLoading, reload } = useApi("/applications/mine");

    const firstName = user?.name?.split(" ")[0] ?? "there";
    const applications = data?.applications ?? [];

    const total = applications.length;
    const accepted = applications.filter((item) => item.status === "accepted").length;
    const pending = applications.filter((item) => item.status === "pending").length;
    const isPro = plan === "pro";

    return (
        <div>
            <PageHeader
                title={`Welcome back, ${firstName}!`}
                description="Track your tuition applications and find your next tutor."
                actions={
                    <Button href="/tuitions">
                        <Search className="size-4" aria-hidden="true" />
                        Browse tuitions
                    </Button>
                }
            />

            {error ? (
                <EmptyState
                    icon={CloudOff}
                    title="We couldn't load your overview"
                    description={error.message}
                >
                    <Button variant="outline" onClick={reload}>
                        Try again
                    </Button>
                </EmptyState>
            ) : isLoading && !data ? (
                <StatsSkeleton />
            ) : (
                <>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            label="Total applied"
                            value={total}
                            hint="Tuitions you have applied for"
                            icon={FileText}
                        />

                        <StatCard
                            label="Accepted"
                            value={accepted}
                            hint={total > 0 ? `${Math.round((accepted / total) * 100)}% acceptance` : "No applications yet"}
                            icon={CircleCheck}
                            tone="success"
                        />

                        <StatCard
                            label="Pending"
                            value={pending}
                            hint="Waiting for tutor review"
                            icon={Clock}
                            tone="accent"
                        />

                        <StatCard
                            label="Current plan"
                            value={isPro ? "Pro" : "Free"}
                            hint={isPro ? "Priority applications on" : "Upgrade for priority"}
                            icon={Crown}
                            tone={isPro ? "accent" : "primary"}
                        />
                    </div>

                    <section className="mt-8" aria-labelledby="quick-actions">
                        <h2 id="quick-actions" className="text-xl">
                            Quick actions
                        </h2>

                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                            {QUICK_ACTIONS.map(({ label, text, href, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="group flex items-center gap-4 rounded-card border border-line bg-surface p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40"
                                >
                                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-link">
                                        <Icon className="size-5" aria-hidden="true" />
                                    </span>

                                    <span className="min-w-0 flex-1">
                                        <span className="block font-semibold text-ink">{label}</span>
                                        <span className="block truncate text-xs text-muted">{text}</span>
                                    </span>

                                    <ArrowUpRight
                                        className="size-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                        aria-hidden="true"
                                    />
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="mt-8" aria-labelledby="recent-applications">
                        <div className="flex items-end justify-between gap-4">
                            <h2 id="recent-applications" className="text-xl">
                                Recent applications
                            </h2>

                            {total > 0 && (
                                <Link
                                    href="/dashboard/student/my-applications"
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-link hover:underline"
                                >
                                    View all
                                    <ArrowRight className="size-4" aria-hidden="true" />
                                </Link>
                            )}
                        </div>

                        <div className="mt-4">
                            <DataTable
                                columns={RECENT_COLUMNS}
                                rows={applications.slice(0, 5)}
                                getRowKey={(row) => row._id}
                                empty={
                                    <EmptyState
                                        icon={ClipboardList}
                                        title="No applications yet"
                                        description="When you apply for a tuition, it will show up here with its status."
                                    >
                                        <Button href="/tuitions" variant="outline">
                                            Find a tuition
                                        </Button>
                                    </EmptyState>
                                }
                            />
                        </div>
                    </section>


                    {!isPro && (
                        <section className="relative mt-8 overflow-hidden rounded-card bg-linear-to-br from-primary to-footer-from p-6 text-white sm:p-8">
                            <div
                                className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-accent/30 blur-3xl"
                                aria-hidden="true"
                            />

                            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-xl text-white">Boost your success rate</h2>

                                    <p className="mt-1 max-w-xl text-sm text-white/80">
                                        Pro students appear first in a tutor&apos;s applicant list and get a
                                        PRO badge on every application.
                                    </p>
                                </div>

                                <Button href="/pricing" variant="accent" className="shrink-0">
                                    <Crown className="size-4" aria-hidden="true" />
                                    See Pro plan
                                </Button>
                            </div>
                        </section>
                    )}
                </>
            )}
        </div>
    );

}