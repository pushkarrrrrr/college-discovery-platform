"use client";

import { memo } from "react";
import { FilterParams } from "@/types";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { TypeFilter } from "./type-filter";
import { LocationFilter } from "./location-filter";
import { FeesFilter } from "./fees-filter";
import { RatingFilter } from "./rating-filter";

interface FilterSidebarProps {
  filters: Partial<FilterParams>;
  onFilterChange: (updated: Partial<FilterParams>) => void;
  onClearFilters: () => void;
  locations: { cities: string[]; states: string[] };
  className?: string;
}

export const FilterSidebar = memo(function FilterSidebar({
  filters,
  onFilterChange,
  onClearFilters,
  locations,
  className
}: FilterSidebarProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/80">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>Filter Search</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          aria-label="Reset all search filters"
          className="text-xs h-8 px-2.5 text-muted-foreground hover:text-destructive hover:bg-destructive/5 gap-1"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          <span>Reset</span>
        </Button>
      </div>

      {/* Filter Body Sections */}
      <div className="space-y-6">
        {/* 1. College Type */}
        <TypeFilter
          value={filters.type || "All"}
          onChange={(type) => onFilterChange({ type })}
        />

        {/* 2. State & City Location */}
        <LocationFilter
          state={filters.state || ""}
          city={filters.city || ""}
          locations={locations}
          onStateChange={(state) => onFilterChange({ state, city: "" })}
          onCityChange={(city) => onFilterChange({ city })}
        />

        {/* 3. Fee Limit range */}
        <FeesFilter
          value={filters.maxFees || Infinity}
          onChange={(maxFees) => onFilterChange({ maxFees })}
        />

        {/* 4. Minimum student rating */}
        <RatingFilter
          value={filters.minRating || 0}
          onChange={(minRating) => onFilterChange({ minRating })}
        />
      </div>
    </div>
  );
});
