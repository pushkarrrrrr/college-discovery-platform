"use client";

import { FilterParams } from "@/types";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal, MapPin, DollarSign, Star, Award, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  filters: Partial<FilterParams>;
  onFilterChange: (updated: Partial<FilterParams>) => void;
  onClearFilters: () => void;
  locations: { cities: string[]; states: string[] };
  className?: string;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onClearFilters,
  locations,
  className
}: FilterSidebarProps) {
  const typeOptions = ["All", "Public", "Private"] as const;
  const ratingOptions = [0, 4.0, 4.2, 4.5, 4.8];

  // Helper to format fees to Lakhs format e.g. 5,00,000 -> 5 Lakh
  const formatLakh = (value: number) => {
    if (value === Infinity || value >= 1500000) return "15L+";
    return `${(value / 100000).toFixed(1)}L`;
  };

  const handleSliderChange = (val: number | readonly number[]) => {
    const num = typeof val === "number" ? val : val[0];
    // If it reaches the maximum slider position, treat as Infinity/unlimited
    onFilterChange({ maxFees: num === 1500000 ? Infinity : num });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/80">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <span>Filter Search</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-xs h-8 px-2.5 text-muted-foreground hover:text-destructive hover:bg-destructive/5 gap-1"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </Button>
      </div>

      {/* Filter Body Sections */}
      <div className="space-y-6">
        {/* 1. College Type */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5" />
            <span>Institution Type</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-accent/30 border border-border/50">
            {typeOptions.map((type) => {
              const isSelected = (filters.type || "All") === type;
              return (
                <button
                  key={type}
                  onClick={() => onFilterChange({ type })}
                  className={cn(
                    "text-xs py-1.5 font-bold rounded-md transition-all",
                    isSelected
                      ? "bg-background text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. State & City Location */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>Location</span>
          </label>

          {/* State select */}
          <div className="space-y-1.5">
            <Select
              value={filters.state || "all_states"}
              onValueChange={(val) =>
                onFilterChange({
                  state: val === "all_states" || !val ? "" : val,
                  city: "" // Reset city choice when changing state
                })
              }
            >
              <SelectTrigger className="w-full h-9.5 text-xs border-border/80 bg-card/60">
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent className="border-border text-xs font-medium">
                <SelectItem value="all_states">All States</SelectItem>
                {locations.states.map((st) => (
                  <SelectItem key={st} value={st}>
                    {st}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City select (dependent on state) */}
          <div className="space-y-1.5">
            <Select
              value={filters.city || "all_cities"}
              onValueChange={(val) =>
                onFilterChange({ city: val === "all_cities" || !val ? "" : val })
              }
            >
              <SelectTrigger className="w-full h-9.5 text-xs border-border/80 bg-card/60">
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent className="border-border text-xs font-medium">
                <SelectItem value="all_cities">All Cities</SelectItem>
                {locations.cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 3. Fee Limit range */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5" />
              <span>Max Annual Fees</span>
            </label>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
              {formatLakh(filters.maxFees || Infinity)}
            </span>
          </div>

          <div className="px-1 py-2">
            <Slider
              defaultValue={[filters.maxFees || 1500000]}
              max={1500000}
              min={100000}
              step={50000}
              value={[filters.maxFees === Infinity ? 1500000 : filters.maxFees || 1500000]}
              onValueChange={handleSliderChange}
              className="py-1 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-2 font-medium">
              <span>₹1.0L</span>
              <span>₹8.0L</span>
              <span>₹15.0L+</span>
            </div>
          </div>
        </div>

        {/* 4. Minimum student rating */}
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5" />
            <span>Minimum Rating</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {ratingOptions.map((rating) => {
              const isSelected = (filters.minRating || 0) === rating;
              return (
                <button
                  key={rating}
                  onClick={() => onFilterChange({ minRating: rating })}
                  className={cn(
                    "flex items-center gap-1 text-xs px-2.5 py-1.5 font-bold rounded-lg border transition-all shadow-sm",
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
                      <Star className={cn("h-3 w-3 fill-current", isSelected ? "text-primary-foreground" : "text-amber-500")} />
                      <span>+</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
