import { Suspense } from "react";
import Container from "@/components/ui/Container";
import SearchFilterBar from "@/components/tuition/SearchFilterBar";
import TuitionResults from "@/components/tuition/TuitionResults";
import TuitionCardSkeleton from "@/components/tuition/TuitionCardSkeleton";

export const metadata = { title: "Browse tuitions" };

const FILTER_KEYS = ["search", "subject", "classLevel", "mode", "sort", "page"];

function firstValue(value) {
    return Array.isArray(value) ? value[0] : value;
}

function ResultsSkeleton() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
                <TuitionCardSkeleton key={index} />
            ))}
        </div>
    );
}


export default async function TuitionsPage({ searchParams }) {
    const params = await searchParams;

    const query = {};
    FILTER_KEYS.forEach((key) => {
        const value = firstValue(params[key]);
        if (value) query[key] = value;
    });

    return (
        <Container className="py-12 sm:py-16">
            <div className="max-w-2xl">
                <h1 className="text-4xl sm:text-5xl">Browse tuitions</h1>

                <p className="mt-4 text-lg text-muted">
                    Search approved tutors and batches, then narrow them down by subject,
                    class level and mode.
                </p>
            </div>

            <div className="mt-8">
                <SearchFilterBar />
            </div>

            <div className="mt-8">
                <Suspense key={JSON.stringify(query)} fallback={<ResultsSkeleton />}>
                    <TuitionResults query={query} />
                </Suspense>
            </div>
        </Container>
    );
}