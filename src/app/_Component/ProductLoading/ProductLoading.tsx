import { Skeleton } from "@/components/ui/skeleton";

export default function ProductSkeleton() {
  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      {/* Big square image placeholder */}
      <Skeleton className="w-full max-w-md h-72 rounded-xl" />

      {/* Title + price lines */}
      <div className="w-full max-w-md space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-1/3" />
      </div>

      {/* Description lines */}
      <div className="w-full max-w-md space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  );
}
