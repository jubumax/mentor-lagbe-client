import { CloudOff, FileQuestion, SearchX } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import TuitionGrid from "@/components/tuition/TuitionGrid";
import Pagination from "@/components/tuition/Pagination";
import { api, toQueryString } from "@/lib/api";


export default async function TuitionResults({ query }) {
    let data;
    try {
        data = await api.get(`/tuitions${toQueryString(query)}`, {
            auth: false,
            cache: "no-store",
        });
    } catch {
        return (
            <EmptyState
                icon={CloudOff}
                title="We couldn't load tuitions"
                description="Something went wrong while contacting the server. Please try again in a moment."
            />
        );
    }

    const { tuitions = [], pagination } = data;

    if (tuitions.length === 0) {
        if (pagination?.total > 0) {
            const { page: _ignored, ...rest } = query;

            return (
                <EmptyState
                    icon={FileQuestion}
                    title="That page doesn't exist"
                    description="You've gone past the last page of results."
                >
                    <Button href={`/tuitions${toQueryString(rest)}`} variant="outline">
                        Back to the first page
                    </Button>
                </EmptyState>
            );
        }

        return (
            <EmptyState
                icon={SearchX}
                title="No tuitions match your filters"
                description="Try a different keyword, or clear the filters to see every approved tuition."
            >
                <Button href="/tuitions" variant="outline">
                    Clear all filters
                </Button>
            </EmptyState>
        );
    }


    const first = (pagination.page - 1) * pagination.limit + 1;
    const last = first + tuitions.length - 1;

    return (
        <>
            <p className="mb-5 text-sm text-muted">
                Showing{" "}
                <span className="font-semibold text-ink">
                    {first}-{last}
                </span>{" "}

                of <span className="font-semibold text-ink">{pagination.total}</span> tuitions
            </p>

            <TuitionGrid tuitions={tuitions} />
            <Pagination pagination={pagination} query={query} basePath="/tuitions" />
        </>
    );
}