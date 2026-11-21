import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toQueryString } from "@/lib/api";
import { cn } from "@/lib/utils";

function getPageItems(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

    if (current <= 4) return [1, 2, 3, 4, 5, "gap-end", total];
    if (current >= total - 3) {
        return [1, "gap-start", total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, "gap-start", current - 1, current, current + 1, "gap-end", total];
}

const arrowClass =
    "inline-flex h-10 items-center gap-1.5 rounded-control border border-line bg-surface px-3.5 text-sm font-semibold text-ink transition-colors";


export default function Pagination({ pagination, query = {}, basePath }) {
    const { page, totalPages, hasPrev, hasNext } = pagination;
    if (totalPages <= 1) return null;

    function hrefFor(target) {
        const { page: _ignored, ...rest } = query;
        return `${basePath}${toQueryString({ ...rest, page: target > 1 ? target : undefined })}`;
    }

    return (
        <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {hasPrev ? (
                <Link href={hrefFor(page - 1)} className={cn(arrowClass, "hover:border-primary hover:text-link")}>
                    <ChevronLeft className="size-4" aria-hidden="true" />
                    Previous
                </Link>
            ) : (
                <span aria-disabled="true" className={cn(arrowClass, "opacity-50")}>
                    <ChevronLeft className="size-4" aria-hidden="true" />
                    Previous
                </span>
            )}

            <ul className="flex items-center gap-1.5">
                {getPageItems(page, totalPages).map((item) =>
                    typeof item === "string" ? (
                        <li key={item} className="px-1 text-muted" aria-hidden="true">
                            …
                        </li>
                    ) : (
                        <li key={item}>
                            <Link
                                href={hrefFor(item)}
                                aria-label={`Page ${item}`}
                                aria-current={item === page ? "page" : undefined}
                                className={cn(
                                    "inline-flex size-10 items-center justify-center rounded-control text-sm font-semibold transition-colors",
                                    item === page
                                        ? "bg-primary text-on-primary"
                                        : "text-ink hover:bg-surface-2"
                                )}
                            >
                                {item}
                            </Link>
                        </li>
                    )
                )}
            </ul>

            {hasNext ? (
                <Link href={hrefFor(page + 1)} className={cn(arrowClass, "hover:border-primary hover:text-link")}>
                    Next
                    <ChevronRight className="size-4" aria-hidden="true" />
                </Link>
            ) : (
                <span aria-disabled="true" className={cn(arrowClass, "opacity-50")}>
                    Next
                    <ChevronRight className="size-4" aria-hidden="true" />
                </span>
            )}
        </nav>
    );
}