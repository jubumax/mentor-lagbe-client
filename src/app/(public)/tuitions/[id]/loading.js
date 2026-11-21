import Container from "@/components/ui/Container";
import Skeleton from "@/components/ui/Skeleton";


export default function TuitionDetailsLoading() {
    return (
        <Container className="py-10 sm:py-14">
            <Skeleton className="h-5 w-40" />
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
                <div className="space-y-6">
                    <Skeleton className="aspect-[16/8] w-full rounded-card" />

                    <div className="space-y-3">
                        <Skeleton className="h-6 w-56" />
                        <Skeleton className="h-10 w-full max-w-xl" />
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>

                    <Skeleton className="h-32 w-full rounded-card" />
                </div>

                <Skeleton className="h-96 w-full rounded-card" />
            </div>
        </Container>
    );
}