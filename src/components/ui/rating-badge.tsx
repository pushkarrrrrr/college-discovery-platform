import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingBadgeProps {
  rating: number;
  reviewsCount?: number;
  size?: "xs" | "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function RatingBadge({
  rating,
  reviewsCount,
  size = "md",
  showText = false,
  className
}: RatingBadgeProps) {
  // Determine color coding based on rating value
  const getColorClasses = (val: number) => {
    if (val >= 4.5) {
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-500/20";
    }
    if (val >= 4.0) {
      return "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-500/20";
    }
    return "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-500/20";
  };

  const sizeClasses = {
    xs: "px-1.5 py-0.5 text-[10px] gap-0.5",
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-sm gap-1",
    lg: "px-3 py-1.5 text-base gap-1.5"
  };

  const starSizes = {
    xs: "h-3 w-3",
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  return (
    <div className={cn("inline-flex items-center", className)}>
      <span
        className={cn(
          "inline-flex items-center font-bold rounded-lg border shadow-sm transition-all",
          getColorClasses(rating),
          sizeClasses[size]
        )}
      >
        <Star className={cn("fill-current stroke-[2.5]", starSizes[size])} />
        <span>{rating.toFixed(1)}</span>
      </span>

      {showText && reviewsCount !== undefined && (
        <span className={cn(
          "text-muted-foreground ml-2 font-medium",
          size === "xs" && "text-[10px]",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          size === "lg" && "text-base"
        )}>
          ({reviewsCount} {reviewsCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}
