"use client";

import { useState } from "react";
import { Crown, CloudOff, Mail, Phone, Users } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
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

const actionBase =
    "h-9 rounded-control px-3 text-sm font-semibold transition-colors disabled:opacity-50";


function StudentCell({ row }) {
    return (
        <div className="flex min-w-0 items-center gap-3">
            <Avatar user={{ name: row.studentName, image: row.studentImage }} className="size-10" />
            <div className="min-w-0">

                <div className="flex items-center gap-2">
                    <p className="truncate font-semibold text-ink">{row.studentName}</p>

                    {row.studentPlan === "pro" && (
                        <Badge tone="accent" icon={Crown}>
                            PRO
                        </Badge>
                    )}
                </div>

                <p className="truncate text-xs text-muted">{row.studentEmail}</p>

            </div>
        </div>
    );
}

export default function Applicants() {
    const { data, error, isLoading, reload } = useApi("/applications/tutor");
    const [tab, setTab] = useState("all");
    const [tuitionId, setTuitionId] = useState("");
    const [selected, setSelected] = useState(null);
    const [busyId, setBusyId] = useState(null);

    const applications = data?.applications ?? [];


    const tuitionOptions = [
        ...new Map(applications.map((item) => [item.tuitionId, item.tuitionTitle])),
    ];

    const inTuition = tuitionId
        ? applications.filter((item) => item.tuitionId === tuitionId)
        : applications;
    const countFor = (key) =>
        key === "all" ? inTuition.length : inTuition.filter((item) => item.status === key).length;
    const rows = tab === "all" ? inTuition : inTuition.filter((item) => item.status === tab);

    async function decide(row, status) {
        setBusyId(row._id);
        try {
            const result = await api.patch(`/applications/${row._id}/status`, { status });
            toast.success(result?.message ?? "Saved.");
            setSelected((current) => (current?._id === row._id ? { ...current, status } : current));
            reload();
        } catch (problem) {
            toast.error(problem instanceof ApiError ? problem.message : "Could not save the decision.");
        } finally {
            setBusyId(null);
        }
    }

    function renderDecisionButtons(row) {
        return (
            <>
                {row.status !== "accepted" && (
                    <button
                        type="button"
                        onClick={() => decide(row, "accepted")}
                        disabled={busyId === row._id}
                        className={cn(actionBase, "text-success hover:bg-success-soft")}
                    >
                        Accept
                    </button>
                )}
                {row.status !== "rejected" && (
                    <button
                        type="button"
                        onClick={() => decide(row, "rejected")}
                        disabled={busyId === row._id}
                        className={cn(actionBase, "text-danger hover:bg-danger-soft")}
                    >
                        Reject
                    </button>
                )}
            </>
        );
    }

    const columns = [
        { key: "student", header: "Student", render: (row) => <StudentCell row={row} /> },
        {
            key: "tuitionTitle",
            header: "Tuition",
            render: (row) => (
                <div className="min-w-0">
                    <p className="line-clamp-1 font-medium text-ink">{row.tuitionTitle}</p>
                    <p className="text-xs text-muted">{row.subject}</p>
                </div>
            ),
        },
        { key: "preferredSchedule", header: "Preferred schedule", className: "text-muted" },
        {
            key: "createdAt",
            header: "Applied on",
            className: "whitespace-nowrap text-muted",
            render: (row) => formatDate(row.createdAt),
        },
        { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
        {
            key: "actions",
            header: "Actions",
            headerClassName: "text-right",
            className: "text-right",
            render: (row) => (
                <div className="flex items-center justify-end gap-1">
                    <button
                        type="button"
                        onClick={() => setSelected(row)}
                        className={cn(actionBase, "text-link hover:bg-primary-soft")}
                    >
                        Details
                    </button>
                    {renderDecisionButtons(row)}
                </div>
            ),
        },
    ];

    const emptyState =
        applications.length === 0 ? (
            <EmptyState
                icon={Users}
                title="No applicants yet"
                description="When students apply for your approved tuitions, they will show up here."
            >
                <Button href="/dashboard/tutor/my-tuitions" variant="outline">
                    View my tuitions
                </Button>
            </EmptyState>
        ) : (
            <EmptyState
                icon={Users}
                title="No applicants match this filter"
                description="Try another status tab or choose a different tuition."
            />
        );


    return (
        <div>
            <PageHeader
                title="Applicants"
                description="Students who applied for your tuitions. Pro students are listed first."
            />

            {error ? (
                <EmptyState
                    icon={CloudOff}
                    title="We couldn't load your applicants"
                    description={error.message}
                >
                    <Button variant="outline" onClick={reload}>
                        Try again
                    </Button>
                </EmptyState>
            ) : isLoading && !data ? (
                <Skeleton className="h-96 w-full rounded-card" />
            ) : (
                <>
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div
                            role="group"
                            aria-label="Filter by status"
                            className="inline-flex max-w-full flex-wrap gap-1 rounded-full border border-line bg-surface p-1"
                        >
                            {TABS.map(({ key, label }) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setTab(key)}
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
                                        {countFor(key)}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {tuitionOptions.length > 1 && (
                            <Select
                                name="tuition"
                                aria-label="Filter by tuition"
                                value={tuitionId}
                                onChange={(event) => setTuitionId(event.target.value)}
                                className="w-full sm:w-72"
                            >
                                <option value="">All tuitions</option>
                                {tuitionOptions.map(([id, title]) => (
                                    <option key={id} value={id}>
                                        {title}
                                    </option>
                                ))}
                            </Select>
                        )}
                    </div>

                    <DataTable
                        columns={columns}
                        rows={rows}
                        getRowKey={(row) => row._id}
                        empty={emptyState}
                    />
                </>
            )}

            <Modal
                open={Boolean(selected)}
                onClose={() => setSelected(null)}
                title={selected?.studentName}
                description={selected?.tuitionTitle}
            >
                {selected && (
                    <div className="space-y-5">
                        <div className="flex flex-wrap items-center gap-2">

                            <StatusBadge status={selected.status} />

                            {selected.studentPlan === "pro" && (
                                <Badge tone="accent" icon={Crown}>
                                    PRO student
                                </Badge>
                            )}
                        </div>

                        <dl className="divide-y divide-line rounded-control border border-line text-sm">
                            <div className="flex items-center justify-between gap-4 p-3">
                                <dt className="flex items-center gap-2 text-muted">
                                    <Phone className="size-4" aria-hidden="true" />
                                    Phone
                                </dt>

                                <dd>
                                    <a href={`tel:${selected.phone}`} className="font-semibold text-link hover:underline">
                                        {selected.phone}
                                    </a>
                                </dd>
                            </div>

                            <div className="flex items-center justify-between gap-4 p-3">
                                <dt className="flex items-center gap-2 text-muted">
                                    <Mail className="size-4" aria-hidden="true" />
                                    Email
                                </dt>

                                <dd className="min-w-0">
                                    <a
                                        href={`mailto:${selected.studentEmail}`}
                                        className="block truncate font-semibold text-link hover:underline"
                                    >
                                        {selected.studentEmail}
                                    </a>
                                </dd>
                            </div>

                            <div className="flex items-center justify-between gap-4 p-3">
                                <dt className="text-muted">Preferred schedule</dt>
                                <dd className="text-right font-semibold text-ink">{selected.preferredSchedule}</dd>
                            </div>

                            <div className="flex items-center justify-between gap-4 p-3">
                                <dt className="text-muted">Applied on</dt>
                                <dd className="font-semibold text-ink">{formatDate(selected.createdAt)}</dd>
                            </div>
                        </dl>

                        <div>
                            <p className="text-sm font-semibold text-ink">Note from the student</p>

                            <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-muted">
                                {selected.learningNote || "The student did not leave a note."}
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-end gap-1 border-t border-line pt-4">
                            {renderDecisionButtons(selected)}
                        </div>
                    </div>
                )}
            </Modal>
        </div>

    );
}