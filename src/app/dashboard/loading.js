import Skeleton from "@/components/ui/Skeleton";

export default function DashboardLoading() {
    return (
        <div>
            <div className="mb-8 space-y-3">
                <Skeleton className="h-9 w-64" />
                <Skeleton className="h-5 w-96 max-w-full" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }, (_, index) => (
                    <Skeleton key={index} className="h-32 rounded-card" />
                ))}
            </div>

            <Skeleton className="mt-6 h-72 w-full rounded-card" />
        </div>
    );
}