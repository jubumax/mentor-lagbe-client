"use client";

import Link from "next/link";
import {
    ArrowUpRight,
    BookOpen,
    CircleCheck,
    CirclePlus,
    CloudOff,
    Crown,
    Library,
    Users,
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


const CONTROLS = [
    {
        label: "Post a new tuition",
        text: "Create a new course offering",
        href: "/dashboard/tutor/post-tuition",
        icon: CirclePlus,
    },
    {
        label: "My tuitions",
        text: "Edit, close or delete your posts",
        href: "/dashboard/tutor/my-tuitions",
        icon: Library,
    },
    {
        label: "Applicants",
        text: "Accept or reject student requests",
        href: "/dashboard/tutor/applicants",
        icon: Users,
    },
];

const LATEST_COLUMNS = [
    {
        key: "title",
        header: "Tuition",
        render: (row) => (
            <div className="min-w-0">
                <p className="line-clamp-1 font-semibold text-ink">{row.title}</p>
                <p className="text-xs text-muted">{row.subject}</p>
            </div>
        ),
    },
    {
        key: "approvalStatus",
        header: "Approval",
        render: (row) => <StatusBadge status={row.approvalStatus} />,
    },
    {
        key: "isActive",
        header: "Availability",
        render: (row) => <StatusBadge status={row.isActive ? "active" : "closed"} />,
    },
    { key: "applicantCount", header: "Applicants", className: "text-muted" },
    {
        key: "createdAt",
        header: "Posted on",
        className: "whitespace-nowrap text-muted",
        render: (row) => formatDate(row.createdAt),
    },
];


export default function TutorOverview() {
    const { user, plan } = useAuth();
    const { data, error, isLoading, reload } = useApi("/tuitions/mine");

    const firstName = user?.name?.split(" ")[0] ?? "there";
    const tuitions = data?.tuitions ?? [];
    const usage = data?.usage;
    const isPro = plan === "pro";

    const liveCount = tuitions.filter(
        (item) => item.approvalStatus === "approved" && item.isActive
    ).length;
    const applicantTotal = tuitions.reduce((sum, item) => sum + item.applicantCount, 0);


    return (
        <div>
            <PageHeader
                title={`Welcome back, ${firstName}!`}
                description="Track your tuition posts and the students who applied."
                actions={
                    <Button href="/dashboard/tutor/post-tuition">
                        <CirclePlus className="size-4" aria-hidden="true" />
                        Post new tuition
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
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 4 }, (_, index) => (
                        <Skeleton key={index} className="h-32 rounded-card" />
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            label="Total tuitions"
                            value={tuitions.length}
                            hint={
                                usage?.limit !== null && usage
                                    ? `${usage.posted} of ${usage.limit} free posts used`
                                    : "Unlimited posts"
                            }
                            icon={BookOpen}
                        />

                        <StatCard
                            label="Live and approved"
                            value={liveCount}
                            hint="Visible to students now"
                            icon={CircleCheck}
                            tone="success"
                        />

                        <StatCard
                            label="Total applicants"
                            value={applicantTotal}
                            hint="Across all your tuitions"
                            icon={Users}
                            tone="accent"
                        />

                        <StatCard
                            label="Current plan"
                            value={isPro ? "Pro" : "Free"}
                            hint={isPro ? "Verified badge active" : "Upgrade for unlimited posts"}
                            icon={Crown}
                            tone={isPro ? "accent" : "primary"}
                        />
                    </div>

                    <section className="mt-8" aria-labelledby="tutor-controls">
                        <h2 id="tutor-controls" className="text-xl">
                            Tutor controls
                        </h2>

                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                            {CONTROLS.map(({ label, text, href, icon: Icon }) => (
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

                    <section className="mt-8" aria-labelledby="latest-tuitions">
                        <h2 id="latest-tuitions" className="text-xl">
                            Your latest tuitions
                        </h2>

                        <div className="mt-4">
                            <DataTable
                                columns={LATEST_COLUMNS}
                                rows={tuitions.slice(0, 5)}
                                getRowKey={(row) => row._id}
                                empty={
                                    <EmptyState
                                        icon={BookOpen}
                                        title="No tuitions yet"
                                        description="Post your first tuition and an admin will review it."
                                    >
                                        <Button href="/dashboard/tutor/post-tuition">Post a tuition</Button>
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
                                    <h2 className="text-xl text-white">Grow with Pro</h2>

                                    <p className="mt-1 max-w-xl text-sm text-white/80">
                                        Post unlimited tuitions and show a verified PRO badge on your profile.
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