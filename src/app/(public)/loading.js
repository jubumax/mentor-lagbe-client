import Container from "@/components/ui/Container";
import Skeleton from "@/components/ui/Skeleton";
import TuitionCardSkeleton from "@/components/tuition/TuitionCardSkeleton";

// Shown while any public page is loading. Pages with their own loading.js override it
export default function PublicLoading() {
    return (
        <Container className="py-16">
            <div className="space-y-4">
                <Skeleton className="h-10 w-72 max-w-full" />
                <Skeleton className="h-5 w-96 max-w-full" />
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }, (_, index) => (
                    <TuitionCardSkeleton key={index} />
                ))}
            </div>
        </Container>
    );
}