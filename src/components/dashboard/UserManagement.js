"use client";

import { useState } from "react";
import { CloudOff, Crown, Search, Users } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import PaginationControls from "@/components/dashboard/PaginationControls";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Skeleton from "@/components/ui/Skeleton";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { useDebounce } from "@/hooks/useDebounce";
import { api, ApiError, toQueryString } from "@/lib/api";
import { formatDate } from "@/lib/utils";


const ROLE_OPTIONS = ["student", "tutor", "admin"];

export default function UserManagement() {
    const { user: me } = useAuth();

    const [searchText, setSearchText] = useState("");
    const [role, setRole] = useState("");
    const [page, setPage] = useState(1);
    const [change, setChange] = useState(null);
    const [saving, setSaving] = useState(false);

    const search = useDebounce(searchText.trim(), 400);
    const { data, error, isLoading, reload } = useApi(
        `/admin/users${toQueryString({ search, role, page })}`
    );

    const users = data?.users ?? [];
    const pagination = data?.pagination;


    async function confirmChange() {
        setSaving(true);
        try {
            const result = await api.patch(`/admin/users/${change.user._id}/role`, {
                role: change.role,
            });

            toast.success(result?.message ?? "Role updated.");
            setChange(null);
            reload();

        } catch (problem) {
            toast.error(problem instanceof ApiError ? problem.message : "Could not change the role.");

        } finally {
            setSaving(false);
        }
    }

    const columns = [
        {
            key: "user",
            header: "User",
            render: (row) => (
                <div className="flex min-w-0 items-center gap-3">
                    <Avatar user={row} className="size-10" />

                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="truncate font-semibold text-ink">{row.name}</p>
                            {row._id === me?.id && <Badge tone="neutral">You</Badge>}
                        </div>

                        <p className="truncate text-xs text-muted">{row.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "role",
            header: "Role",
            render: (row) => (
                <Select
                    name={`role-${row._id}`}
                    aria-label={`Role for ${row.name}`}
                    value={row.role}
                    disabled={row._id === me?.id}
                    onChange={(event) => setChange({ user: row, role: event.target.value })}
                    className="w-36"
                >
                    {ROLE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                    ))}
                </Select>
            ),
        },
        {
            key: "plan",
            header: "Plan",
            render: (row) =>
                row.plan === "pro" ? (
                    <Badge tone="accent" icon={Crown}>
                        Pro
                    </Badge>
                ) : (
                    <Badge tone="neutral">Free</Badge>
                ),
        },
        {
            key: "createdAt",
            header: "Joined",
            className: "whitespace-nowrap text-muted",
            render: (row) => formatDate(row.createdAt),
        },
    ];

    const hasFilters = Boolean(searchText || role);

    return (
        <div>
            <PageHeader
                title="User management"
                description="Every registered account on the platform. Change a person's role when needed."
            />

            <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_12rem]">
                <Input
                    name="search"
                    type="search"
                    icon={Search}
                    aria-label="Search users"
                    placeholder="Search by name or email"
                    autoComplete="off"
                    value={searchText}
                    onChange={(event) => {
                        setSearchText(event.target.value);
                        setPage(1);
                    }}
                />

                <Select
                    name="role"
                    aria-label="Filter by role"
                    value={role}
                    onChange={(event) => {
                        setRole(event.target.value);
                        setPage(1);
                    }}
                >
                    <option value="">All roles</option>
                    {ROLE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}s
                        </option>
                    ))}
                </Select>
            </div>

            {error ? (
                <EmptyState icon={CloudOff} title="We couldn't load the users" description={error.message}>
                    <Button variant="outline" onClick={reload}>
                        Try again
                    </Button>
                </EmptyState>
            ) : isLoading && !data ? (
                <Skeleton className="h-96 w-full rounded-card" />
            ) : (
                <>
                    <p className="mb-3 text-sm text-muted">
                        <span className="font-semibold text-ink">{pagination?.total ?? 0}</span>{" "}
                        {pagination?.total === 1 ? "user" : "users"}
                        {hasFilters ? " match your filters" : " in total"}
                    </p>
                    <div className={isLoading ? "opacity-60 transition-opacity" : "transition-opacity"}>
                        <DataTable
                            columns={columns}
                            rows={users}
                            getRowKey={(row) => row._id}
                            empty={
                                <EmptyState
                                    icon={Users}
                                    title="No users found"
                                    description="Try a different name, email or role."
                                />
                            }
                        />
                    </div>
                    <PaginationControls pagination={pagination} onPageChange={setPage} />
                </>
            )}


            <ConfirmDialog
                open={Boolean(change)}
                title="Change this user's role?"
                description={
                    change
                        ? `${change.user.name} will change from ${change.user.role} to ${change.role}. Their dashboard and permissions change with it.`
                        : undefined
                }
                confirmLabel="Change role"
                cancelLabel="Cancel"
                tone="primary"
                loading={saving}
                onConfirm={confirmChange}
                onClose={() => !saving && setChange(null)}
            />
        </div>
    );
}