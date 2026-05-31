import { Skeleton } from "@/components/ui/skeleton"

export function SidebarLoadingSkeleton() {
    return (
        <div className="flex items-center gap-3 p-3">
            <Skeleton className="h-12 w-12 rounded-full shrink-0" />

            <div className="hidden lg:block space-y-2 flex-1">
                <Skeleton className="h-4 w-32 lg:w-40" />
                <Skeleton className="h-3 w-20" />
            </div>
        </div>
    )
}
