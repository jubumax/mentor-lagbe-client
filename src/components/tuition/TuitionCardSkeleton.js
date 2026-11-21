import Skeleton from "@/components/ui/Skeleton";

export default function TuitionCardSkeleton() {
    return (
        <div className="flex h-full flex-col rounded-card border border-line bg-surface p-3">
            <Skeleton className="aspect-[16/10] w-full rounded-2xl" />

            <div className="space-y-3 px-2 pb-1 pt-4">
                <div className="flex justify-between">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-5 w-16" />
                </div>

                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="mt-4 h-px w-full" />

                <div className="flex items-center justify-between pt-1">
                    <Skeleton className="h-7 w-24" />
                    <Skeleton className="h-9 w-28" />
                </div>
            </div>
        </div>
    );
}