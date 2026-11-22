"use client";

import { useState } from "react";
import { CloudOff, DollarSign, Receipt, Search } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import DataTable from "@/components/dashboard/DataTable";
import PaginationControls from "@/components/dashboard/PaginationControls";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Input from "@/components/ui/Input";
import Skeleton from "@/components/ui/Skeleton";
import { useApi } from "@/hooks/useApi";
import { useDebounce } from "@/hooks/useDebounce";
import { toQueryString } from "@/lib/api";
import { formatDate, formatUsd } from "@/lib/utils";
import { ROLE_BADGES } from "@/data/user-menu";


const COLUMNS = [
    {
        key: "userName",
        header: "User",
        className: "font-semibold text-ink",
    },
    { key: "userEmail", header: "Email", className: "text-muted" },
    {
        key: "userRole",
        header: "Role",
        render: (row) => {
            const badge = ROLE_BADGES[row.userRole] ?? { label: row.userRole, tone: "neutral" };
            return <Badge tone={badge.tone}>{badge.label}</Badge>;
        },
    },
    { key: "planName", header: "Plan", className: "whitespace-nowrap" },
    {
        key: "amount",
        header: "Amount",
        className: "whitespace-nowrap font-semibold text-ink",
        render: (row) => formatUsd(row.amount),
    },
    {
        key: "transactionId",
        header: "Transaction ID",
        render: (row) => (
            <span
                title={row.transactionId}
                className="block max-w-40 truncate font-mono text-xs text-muted"
            >
                {row.transactionId}
            </span>
        ),
    },
    {
        key: "paidAt",
        header: "Payment date",
        className: "whitespace-nowrap text-muted",
        render: (row) => formatDate(row.paidAt),
    },
];


export default function Transactions() {
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);

    const search = useDebounce(searchText.trim(), 400);
    const { data, error, isLoading, reload } = useApi(
        `/admin/transactions${toQueryString({ search, page })}`
    );

    const transactions = data?.transactions ?? [];
    const pagination = data?.pagination;

    return (
        <div>
            <PageHeader
                title="Transaction history"
                description="Every Pro plan payment made through Stripe."
            />

            {error ? (
                <EmptyState icon={CloudOff} title="We couldn't load the transactions" description={error.message}>
                    <Button variant="outline" onClick={reload}>
                        Try again
                    </Button>
                </EmptyState>
            ) : isLoading && !data ? (
                <Skeleton className="h-96 w-full rounded-card" />
            ) : (
                <>
                    <div className="mb-6 grid gap-4 sm:grid-cols-2">
                        <StatCard
                            label="Total revenue"
                            value={formatUsd(data.totalRevenue)}
                            hint="From all Pro plan payments"
                            icon={DollarSign}
                            tone="success"
                        />

                        <StatCard
                            label={search ? "Matching payments" : "Payments"}
                            value={pagination?.total ?? 0}
                            hint="Recorded in the payments collection"
                            icon={Receipt}
                        />
                    </div>

                    <div className="mb-5">
                        <Input
                            name="search"
                            type="search"
                            icon={Search}
                            aria-label="Search transactions"
                            placeholder="Search by name, email or transaction ID"
                            autoComplete="off"
                            value={searchText}
                            onChange={(event) => {
                                setSearchText(event.target.value);
                                setPage(1);
                            }}
                            className="max-w-md"
                        />
                    </div>

                    <div className={isLoading ? "opacity-60 transition-opacity" : "transition-opacity"}>
                        <DataTable
                            columns={COLUMNS}
                            rows={transactions}
                            getRowKey={(row) => row._id}
                            empty={
                                <EmptyState
                                    icon={Receipt}
                                    title={search ? "No payments match your search" : "No transactions yet"}
                                    description={
                                        search
                                            ? "Try a different name, email or transaction ID."
                                            : "Pro plan payments will be listed here after the first purchase."
                                    }
                                />
                            }
                        />
                    </div>
                    <PaginationControls pagination={pagination} onPageChange={setPage} />
                </>
            )}
        </div>
    );
}