"use client";

import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LocationFilterProps {
  state: string;
  city: string;
  locations: { cities: string[]; states: string[] };
  onStateChange: (state: string) => void;
  onCityChange: (city: string) => void;
}

export function LocationFilter({
  state,
  city,
  locations,
  onStateChange,
  onCityChange,
}: LocationFilterProps) {
  return (
    <div className="space-y-4">
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Location</span>
      </span>

      {/* State select */}
      <div className="space-y-1.5">
        <Select
          value={state || "all_states"}
          onValueChange={(val) => onStateChange(val === "all_states" || !val ? "" : val)}
        >
          <SelectTrigger className="w-full h-9.5 text-xs border-border/80 bg-card/60" aria-label="Filter by state">
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
          value={city || "all_cities"}
          onValueChange={(val) => onCityChange(val === "all_cities" || !val ? "" : val)}
        >
          <SelectTrigger className="w-full h-9.5 text-xs border-border/80 bg-card/60" aria-label="Filter by city">
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent className="border-border text-xs font-medium">
            <SelectItem value="all_cities">All Cities</SelectItem>
            {locations.cities.map((ct) => (
              <SelectItem key={ct} value={ct}>
                {ct}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
