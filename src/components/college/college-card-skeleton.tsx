export function CollegeCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex flex-col justify-between shadow-sm animate-pulse">
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
          <div className="flex items-center justify-between gap-2">
            <div className="h-5 w-3/5 rounded bg-muted/80" />
            <div className="h-5 w-10 rounded bg-muted/60" />
          </div>
          <div className="h-3.5 w-1/3 rounded bg-muted/60" />
        </div>

        {/* Description skeleton */}
        <div className="mt-4 space-y-1.5">
          <div className="h-3 w-full rounded bg-muted/60" />
          <div className="h-3 w-5/6 rounded bg-muted/60" />
        </div>

        {/* Quick Highlights Grid skeleton */}
        <div className="grid grid-cols-2 gap-3 mt-4 p-2.5 rounded-xl border border-border/40 bg-accent/10">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-muted/60" />
            <div className="space-y-1.5 flex-1">
              <div className="h-2 w-12 rounded bg-muted/60" />
              <div className="h-3.5 w-16 rounded bg-muted/80" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-muted/60" />
            <div className="space-y-1.5 flex-1">
              <div className="h-2 w-12 rounded bg-muted/60" />
              <div className="h-3.5 w-16 rounded bg-muted/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="mt-5 pt-4 border-t border-border/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Mock Compare Check */}
          <div className="h-8 w-16 rounded-lg bg-muted/80" />
          {/* Mock Save Badge */}
          <div className="h-8 w-8 rounded-lg bg-muted/60" />
        </div>
        {/* Mock Detail Link */}
        <div className="h-8 w-24 rounded-lg bg-muted/80" />
      </div>
    </div>
  );
}
