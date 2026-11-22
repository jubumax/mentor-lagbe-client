"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";


export default function PaginationControls({ pagination, onPageChange }) {
    if (!pagination || pagination.totalPages <= 1) return null;

    const { page, totalPages, hasPrev, hasNext } = pagination;

    return (
        <nav
            aria-label="Pagination"
            className="mt-5 flex items-center justify-between gap-3"
        >
            <p className="text-sm text-muted">
                Page <span className="font-semibold text-ink">{page}</span> of{" "}
                <span className="font-semibold text-ink">{totalPages}</span>
            </p>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={!hasPrev}
                    onClick={() => onPageChange(page - 1)}
                >
                    <ChevronLeft className="size-4" aria-hidden="true" />
                    Previous
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    disabled={!hasNext}
                    onClick={() => onPageChange(page + 1)}
                >
                    Next
                    <ChevronRight className="size-4" aria-hidden="true" />
                </Button>
            </div>
        </nav>
    );
}