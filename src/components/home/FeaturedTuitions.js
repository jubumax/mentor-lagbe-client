import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, BookX, CloudOff } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import TuitionGrid from "@/components/tuition/TuitionGrid";
import TuitionCardSkeleton from "@/components/tuition/TuitionCardSkeleton";
import { api } from "@/lib/api";


async function loadFeatured() {
    try {
        const data = await api.get("/tuitions/featured", {
            auth: false,
            next: { revalidate: 30 },
        });

        return { tuitions: data?.tuitions ?? [], failed: false };

    } catch {
        return { tuitions: [], failed: true };
    }
}


async function FeaturedGrid() {
    const { tuitions, failed } = await loadFeatured();

    if (failed) {
        return (
            <EmptyState
                icon={CloudOff}
                title="We couldn't load tuitions"
                description="Something went wrong while contacting the server. Please try again in a moment."
            />
        );
    }

    if (tuitions.length === 0) {
        return (
            <EmptyState
                icon={BookX}
                title="No tuitions published yet"
                description="Approved tuitions will show up here as soon as tutors start posting."
            >
                <Button href="/sign-up?role=tutor" variant="outline">
                    Become a tutor
                </Button>
            </EmptyState>
        );
    }

    return <TuitionGrid tuitions={tuitions} />;
}


function FeaturedSkeleton() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
                <TuitionCardSkeleton key={index} />
            ))}
        </div>
    );
}


export default function FeaturedTuitions() {
    return (
        <section className="py-16 sm:py-20">
            <Container>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <SectionHeading
                        align="left"
                        title="Latest tuitions you can join today"
                        description="Every listing is reviewed by our admins before it appears here."
                    />

                    <Link
                        href="/tuitions"
                        className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-link hover:underline"
                    >
                        Browse all tuitions
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                </div>

                <div className="mt-10">
                    <Suspense fallback={<FeaturedSkeleton />}>
                        <FeaturedGrid />
                    </Suspense>
                </div>
            </Container>
        </section>
    );
}