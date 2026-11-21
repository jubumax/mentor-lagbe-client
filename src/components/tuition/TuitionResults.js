import { CloudOff, SearchX } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import TuitionGrid from "@/components/tuition/TuitionGrid";
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


    return (
        <>
            <p className="mb-5 text-sm text-muted">
                Showing <span className="font-semibold text-ink">{tuitions.length}</span> of{" "}
                <span className="font-semibold text-ink">{pagination?.total ?? tuitions.length}</span>{" "}
                tuitions
            </p>

            <TuitionGrid tuitions={tuitions} />
        </>
    );
}