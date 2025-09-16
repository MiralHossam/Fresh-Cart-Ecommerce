"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function HomeLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full max-w-full min-h-[60vh]">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col space-y-3 p-4 bg-white shadow-md rounded-2xl w-full"
        >
          {/* Image placeholder */}
          <Skeleton className="h-[150px] w-full rounded-xl animate-pulse" />

          {/* Text placeholders */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4 rounded-md animate-pulse" />
            <Skeleton className="h-5 w-1/2 rounded-md animate-pulse" />
          </div>

          {/* Button placeholder */}
          <Skeleton className="h-10 w-full rounded-lg animate-pulse" />
        </div>
      ))}
    </div>
  )
}
