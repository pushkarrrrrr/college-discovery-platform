import { Suspense } from "react";
import { CollegesList } from "./colleges-list";
import { CollegeCardSkeleton } from "@/components/college/college-card-skeleton";

export const metadata = {
  title: "Explore Colleges — EduDiscover",
  description: "Find the best engineering and management universities in India. Filter by fees, placements, ratings, and locations.",
};

export default function CollegesPage() {
  return (
    <Suspense fallback={<CollegesPageSkeleton />}>
      <CollegesList />
    </Suspense>
  );
}

function CollegesPageSkeleton() {
  return (
    <div className="flex flex-col gap-6 py-4 animate-pulse">
      {/* Header title skeleton */}
      <div className="space-y-2 pb-6 border-b border-border/60">
        <div className="h-8 w-64 rounded bg-muted/80" />
        <div className="h-4 w-96 rounded bg-muted/60" />
      </div>

      {/* Search box placeholder skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-2">
        <div className="h-11 w-full bg-muted/80 rounded-xl" />
        <div className="h-10 w-[180px] bg-muted/80 rounded-lg" />
      </div>

      {/* Grid wrapper skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
        {/* Sidebar skeleton */}
        <div className="hidden lg:block lg:col-span-1 h-[450px] border border-border bg-card/60 rounded-2xl p-5" />
        
        {/* Cards list skeleton */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <CollegeCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
