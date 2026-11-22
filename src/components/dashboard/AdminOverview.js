"use client";

import Link from "next/link";
import {
    ArrowUpRight,
    BookOpen,
    CloudOff,
    DollarSign,
    GraduationCap,
    Hourglass,
    Receipt,
    Users,
} from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useApi } from "@/hooks/useApi";
import { cn, formatUsd } from "@/lib/utils";


const SEGMENTS = [
    { key: "approved", label: "Approved", dot: "bg-success" },
    { key: "pending", label: "Pending", dot: "bg-accent" },
    { key: "rejected", label: "Rejected", dot: "bg-danger" },
];

function TuitionBreakdown({ tuitions }) {
    const { total } = tuitions;

    return (
        <section className="rounded-card border border-line bg-surface p-6 shadow-card" aria-labelledby="breakdown">
            <h2 id="breakdown" className="text-xl">
                Tuition moderation
            </h2>

            <p className="mt-1 text-sm text-muted">
                {total === 0
                    ? "No tuitions have been posted yet."
                    : `${total} tuition${total === 1 ? "" : "s"} submitted by tutors.`}
            </p>

            <div
                className="mt-5 flex h-3 overflow-hidden rounded-full bg-surface-2"
                role="img"
                aria-label={`${tuitions.approved} approved, ${tuitions.pending} pending, ${tuitions.rejected} rejected`}
            >
                {total > 0 &&
                    SEGMENTS.map(({ key, dot }) => (
                        <span
                            key={key}
                            className={dot}
                            style={{ width: `${(tuitions[key] / total) * 100}%` }}
                        />
                    ))}
            </div>

            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {SEGMENTS.map(({ key, label, dot }) => (
                    <li key={key} className="flex items-center gap-2 text-muted">
                        <span className={cn("size-2.5 rounded-full", dot)} aria-hidden="true" />
                        {label}
                        <span className="font-semibold text-ink">{tuitions[key]}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}


export default function AdminOverview() {
    const { data, error, isLoading, reload } = useApi("/admin/stats");
    const stats = data?.stats;

    const links = [
        {
            label: "User management",
            text: "Review accounts and change roles",
            href: "/dashboard/admin/users",
            icon: Users,
        },
        {
            label: "Tuition moderation",
            text: stats
                ? `${stats.tuitions.pending} waiting for review`
                : "Approve or reject tuition posts",
            href: "/dashboard/admin/tuitions",
            icon: BookOpen,
        },
        {
            label: "Transactions",
            text: "Stripe payments for Pro plans",
            href: "/dashboard/admin/transactions",
            icon: Receipt,
        },
    ];


    return (
        <div>
            <PageHeader
                title="System administration"
                description="Platform metrics, tuition moderation, user roles and payment volume."
            />

            {error ? (
                <EmptyState
                    icon={CloudOff}
                    title="We couldn't load the statistics"
                    description={error.message}
                >
                    <Button variant="outline" onClick={reload}>
                        Try again
                    </Button>
                </EmptyState>
            ) : isLoading && !stats ? (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 4 }, (_, index) => (
                        <Skeleton key={index} className="h-32 rounded-card" />
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            label="Total users"
                            value={stats.totalUsers}
                            hint={`${stats.totalStudents} students`}
                            icon={Users}
                        />

                        <StatCard
                            label="Total tutors"
                            value={stats.totalTutors}
                            hint="Registered tutors"
                            icon={GraduationCap}
                            tone="success"
                        />

                        <StatCard
                            label="Pending tuitions"
                            value={stats.tuitions.pending}
                            hint={`${stats.tuitions.approved} approved`}
                            icon={Hourglass}
                            tone="accent"
                        />

                        <StatCard
                            label="Total revenue"
                            value={formatUsd(stats.revenue)}
                            hint={`${stats.payments} Stripe payment${stats.payments === 1 ? "" : "s"}`}
                            icon={DollarSign}
                            tone="success"
                        />
                    </div>

                    <div className="mt-8">
                        <TuitionBreakdown tuitions={stats.tuitions} />
                    </div>

                    <section className="mt-8" aria-labelledby="admin-links">
                        <h2 id="admin-links" className="text-xl">
                            Admin tools
                        </h2>

                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                            {links.map(({ label, text, href, icon: Icon }) => (
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
                </>

            )}
        </div>
    );
}