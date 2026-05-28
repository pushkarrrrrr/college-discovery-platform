export function CollegeCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col justify-between h-[320px] shadow-sm animate-pulse">
      <div>
        {/* Top bar skeleton */}
        <div className="flex items-start justify-between gap-4">
          <div className="h-12 w-12 rounded-xl bg-muted/80 flex-shrink-0" />
          <div className="flex flex-col items-end gap-2">
            <div className="h-5 w-16 rounded-md bg-muted/80" />
            <div className="h-3 w-10 rounded-md bg-muted/60" />
          </div>
        </div>

        {/* Name and location skeleton */}
        <div className="mt-4 space-y-2">
          <div className="h-5 w-4/5 rounded bg-muted/80" />
          <div className="h-3 w-2/5 rounded bg-muted/60" />
        </div>

        {/* Description skeleton */}
        <div className="mt-4 space-y-1.5">
          <div className="h-3.5 w-full rounded bg-muted/60" />
          <div className="h-3.5 w-5/6 rounded bg-muted/60" />
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <div className="space-y-1.5">
          <div className="h-3 w-12 rounded bg-muted/60" />
          <div className="h-4.5 w-20 rounded bg-muted/80" />
        </div>
        <div className="h-8 w-24 rounded-lg bg-muted/80" />
      </div>
    </div>
  );
}
