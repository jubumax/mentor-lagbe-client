"use client";

import { useState } from "react";
import Link from "next/link";
import {
    BookOpen,
    CircleCheck,
    CloudOff,
    ExternalLink,
    Eye,
    Search,
} from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import PaginationControls from "@/components/dashboard/PaginationControls";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Skeleton from "@/components/ui/Skeleton";
import StatusBadge from "@/components/ui/StatusBadge";
import { useApi } from "@/hooks/useApi";
import { useDebounce } from "@/hooks/useDebounce";
import { api, ApiError, toQueryString } from "@/lib/api";
import { cn, formatDate, formatFee } from "@/lib/utils";
import Image from "next/image";


const TABS = [
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
    { key: "all", label: "All" },
];

const actionBase =
    "h-9 rounded-control px-3 text-sm font-semibold transition-colors disabled:opacity-50";

const EMPTY_MESSAGES = {
    pending: {
        title: "All clear",
        description: "There are no tuitions waiting for moderation.",
    },
    approved: {
        title: "No approved tuitions",
        description: "Approved tuitions will be listed here.",
    },
    rejected: {
        title: "No rejected tuitions",
        description: "Rejected tuitions will be listed here.",
    },
    all: {
        title: "No tuitions yet",
        description: "Tuitions posted by tutors will be listed here.",
    },
};


function PreviewBody({ id }) {
    const { data, error, isLoading } = useApi(`/admin/tuitions/${id}`);
    const tuition = data?.tuition;

    if (error) return <p className="text-sm text-danger">{error.message}</p>;
    if (isLoading && !tuition) return <Skeleton className="h-64 w-full" />;

    const facts = [
        ["Tutor", `${tuition.tutorName} (${tuition.tutorEmail})`],
        ["Monthly fee", formatFee(tuition.monthlyFee)],
        ["Schedule", `${tuition.daysPerWeek} day${tuition.daysPerWeek === 1 ? "" : "s"} / week`],
        ["Mode", `${tuition.mode}, ${tuition.location}`],
        ["Posted on", formatDate(tuition.createdAt)],
    ];

    return (
        <div className="space-y-5">
            {tuition.bannerImage && (
                <Image
                    src={tuition.bannerImage}
                    alt={`Banner for ${tuition.title}`}
                    className="aspect-[16/7] w-full rounded-control object-cover"
                />
            )}

            <div className="flex flex-wrap gap-2">
                <Badge tone="primary">{tuition.subject}</Badge>
                <Badge tone="neutral">{tuition.classLevel}</Badge>
            </div>

            <dl className="divide-y divide-line rounded-control border border-line text-sm">
                {facts.map(([label, value]) => (
                    <div key={label} className="flex items-start justify-between gap-4 p-3">
                        <dt className="shrink-0 text-muted">{label}</dt>
                        <dd className="text-right font-semibold text-ink">{value}</dd>
                    </div>
                ))}
            </dl>

            <div>
                <p className="text-sm font-semibold text-ink">Description</p>
                <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-muted">
                    {tuition.description}
                </p>
            </div>
        </div>
    );
}


export default function TuitionModeration() {
    const [tab, setTab] = useState("pending");
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [preview, setPreview] = useState(null);
    const [busyId, setBusyId] = useState(null);

    const search = useDebounce(searchText.trim(), 400);
    const { data, error, isLoading, reload } = useApi(
        `/admin/tuitions${toQueryString({ status: tab === "all" ? "" : tab, search, page })}`
    );

    const tuitions = data?.tuitions ?? [];
    const counts = data?.counts;
    const pagination = data?.pagination;

    async function decide(row, status) {
        setBusyId(row._id);
        try {
            const result = await api.patch(`/admin/tuitions/${row._id}/status`, { status });
            toast.success(result?.message ?? "Saved.");

            setPreview((current) =>
                current?._id === row._id ? { ...current, approvalStatus: status } : current
            );

            reload();

        } catch (problem) {
            toast.error(problem instanceof ApiError ? problem.message : "Could not save the decision.");

        } finally {
            setBusyId(null);
        }
    }

    // pending: approve or reject | approved: revoke | rejected: reinstate
    function renderActions(row) {
        const busy = busyId === row._id;
        const approve = (label) => (
            <button
                type="button"
                onClick={() => decide(row, "approved")}
                disabled={busy}
                className={cn(actionBase, "text-success hover:bg-success-soft")}
            >
                {label}
            </button>
        );
        const reject = (label) => (
            <button
                type="button"
                onClick={() => decide(row, "rejected")}
                disabled={busy}
                className={cn(actionBase, "text-danger hover:bg-danger-soft")}
            >
                {label}
            </button>
        );

        if (row.approvalStatus === "pending") {
            return (
                <>
                    {approve("Approve")}
                    {reject("Reject")}
                </>
            );
        }
        return row.approvalStatus === "approved" ? reject("Revoke") : approve("Reinstate");
    }

    const columns = [
        {
            key: "tuition",
            header: "Tuition",
            render: (row) => (
                <div className="flex min-w-0 items-center gap-3">
                    <div className="size-12 shrink-0 overflow-hidden rounded-xl bg-primary-soft">
                        {row.bannerImage ? (
                            <Image src={row.bannerImage} alt="" className="size-full object-cover" />
                        ) : (
                            <span className="flex size-full items-center justify-center text-link">
                                <BookOpen className="size-5" aria-hidden="true" />
                            </span>
                        )}
                    </div>

                    <div className="min-w-0">
                        <p className="line-clamp-1 font-semibold text-ink">{row.title}</p>
                        <p className="text-xs text-muted">
                            {row.subject} · {row.classLevel} · {row.mode}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            key: "tutor",
            header: "Tutor",
            render: (row) => (
                <div className="min-w-0">
                    <p className="truncate font-medium text-ink">{row.tutorName}</p>
                    <p className="truncate text-xs text-muted">{row.tutorEmail}</p>
                </div>
            ),
        },
        {
            key: "monthlyFee",
            header: "Monthly fee",
            className: "whitespace-nowrap font-semibold text-ink",
            render: (row) => formatFee(row.monthlyFee),
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
        {
            key: "createdAt",
            header: "Posted on",
            className: "whitespace-nowrap text-muted",
            render: (row) => formatDate(row.createdAt),
        },
        {
            key: "actions",
            header: "Actions",
            headerClassName: "text-right",
            className: "text-right",
            render: (row) => (
                <div className="flex items-center justify-end gap-1">
                    <button
                        type="button"
                        onClick={() => setPreview(row)}
                        aria-label="Preview tuition"
                        title="Preview"
                        className="inline-flex size-9 items-center justify-center rounded-control text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                    >
                        <Eye className="size-[18px]" aria-hidden="true" />
                    </button>
                    {renderActions(row)}
                </div>
            ),
        },
    ];


    const message = EMPTY_MESSAGES[tab];

    return (
        <div>
            <PageHeader
                title="Tuition moderation"
                description="Review tuitions submitted by tutors. Only approved tuitions appear on the Browse page."
            />

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div
                    role="group"
                    aria-label="Filter by approval status"
                    className="inline-flex max-w-full flex-wrap gap-1 rounded-full border border-line bg-surface p-1"
                >
                    {TABS.map(({ key, label }) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => {
                                setTab(key);
                                setPage(1);
                            }}
                            aria-pressed={tab === key}
                            className={cn(
                                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                                tab === key ? "bg-primary text-on-primary" : "text-muted hover:text-ink"
                            )}
                        >
                            {label}

                            <span
                                className={cn(
                                    "rounded-full px-2 py-0.5 text-xs",
                                    tab === key ? "bg-white/20" : "bg-surface-2"
                                )}
                            >
                                {counts ? counts[key] : "-"}
                            </span>
                        </button>
                    ))}
                </div>

                <Input
                    name="search"
                    type="search"
                    icon={Search}
                    aria-label="Search tuitions"
                    placeholder="Search title or tutor"
                    autoComplete="off"
                    value={searchText}
                    onChange={(event) => {
                        setSearchText(event.target.value);
                        setPage(1);
                    }}
                    className="w-full sm:w-72"
                />
            </div>

            {error ? (
                <EmptyState icon={CloudOff} title="We couldn't load the tuitions" description={error.message}>
                    <Button variant="outline" onClick={reload}>
                        Try again
                    </Button>
                </EmptyState>
            ) : isLoading && !data ? (
                <Skeleton className="h-96 w-full rounded-card" />
            ) : (
                <>
                    <div className={isLoading ? "opacity-60 transition-opacity" : "transition-opacity"}>
                        <DataTable
                            columns={columns}
                            rows={tuitions}
                            getRowKey={(row) => row._id}
                            empty={
                                <EmptyState
                                    icon={search ? BookOpen : CircleCheck}
                                    title={search ? "No tuitions match your search" : message.title}
                                    description={search ? "Try a different title or tutor name." : message.description}
                                />
                            }
                        />
                    </div>
                    <PaginationControls pagination={pagination} onPageChange={setPage} />
                </>
            )}

            <Modal
                open={Boolean(preview)}
                onClose={() => setPreview(null)}
                title={preview?.title}
                className="max-w-2xl"
            >
                {preview && (
                    <div className="space-y-5">
                        <div className="flex flex-wrap items-center gap-2">
                            <StatusBadge status={preview.approvalStatus} />

                            <StatusBadge status={preview.isActive ? "active" : "closed"} />

                            {preview.approvalStatus === "approved" && preview.isActive && (
                                <Link
                                    href={`/tuitions/${preview._id}`}
                                    target="_blank"
                                    className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-link hover:underline"
                                >
                                    Open public page
                                    <ExternalLink className="size-4" aria-hidden="true" />
                                </Link>
                            )}
                        </div>

                        <PreviewBody key={preview._id} id={preview._id} />

                        <div className="flex flex-wrap justify-end gap-1 border-t border-line pt-4">
                            {renderActions(preview)}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}