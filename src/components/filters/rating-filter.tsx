"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingFilterProps {
  value: number;
  onChange: (rating: number) => void;
}

export function RatingFilter({ value, onChange }: RatingFilterProps) {
  const ratingOptions = [0, 4.0, 4.2, 4.5, 4.8];

  return (
    <div className="space-y-2.5">
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        <Star className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Minimum Rating</span>
      </span>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Minimum student rating filter">
        {ratingOptions.map((rating) => {
          const isSelected = value === rating;
          const btnLabel = rating === 0 ? "Show all ratings" : `${rating.toFixed(1)} stars and above`;
          return (
            <button
              key={rating}
              onClick={() => onChange(rating)}
              aria-pressed={isSelected}
              aria-label={btnLabel}
              className={cn(
                "flex items-center gap-1 text-xs px-2.5 py-1.5 font-bold rounded-lg border transition-all shadow-sm cursor-pointer",
                isSelected
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-card border-border/80 text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground"
              )}
            >
              {rating === 0 ? (
                <span>All</span>
              ) : (
                <>
                  <span>{rating.toFixed(1)}</span>
                  <Star className={cn("h-3 w-3 fill-current", isSelected ? "text-primary-foreground" : "text-amber-500")} aria-hidden="true" />
                  <span>+</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
