import Container from "@/components/ui/Container";
import Skeleton from "@/components/ui/Skeleton";
import TuitionCardSkeleton from "@/components/tuition/TuitionCardSkeleton";

export default function TuitionsLoading() {
    return (
        <Container className="py-12 sm:py-16">
            <div className="space-y-4">
                <Skeleton className="h-12 w-80 max-w-full" />
                <Skeleton className="h-5 w-full max-w-xl" />
            </div>

            <Skeleton className="mt-8 h-24 w-full rounded-card" />

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }, (_, index) => (
                    <TuitionCardSkeleton key={index} />
                ))}
            </div>
        </Container>
    );
}