"use client";

import { IndianRupee } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface FeesFilterProps {
  value: number;
  onChange: (value: number) => void;
}

export function FeesFilter({ value, onChange }: FeesFilterProps) {
  // Helper to format fees to Lakhs format e.g. 5,00,000 -> 5 Lakh
  const formatLakh = (val: number) => {
    if (val === Infinity || val >= 1500000) return "15L+";
    return `${(val / 100000).toFixed(1)}L`;
  };

  const handleSliderChange = (val: number | readonly number[]) => {
    const num = typeof val === "number" ? val : val[0];
    onChange(num === 1500000 ? Infinity : num);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <IndianRupee className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Max Annual Fees</span>
        </span>
        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
          {formatLakh(value)}
        </span>
      </div>

      <div className="px-1 py-2">
        <Slider
          defaultValue={[value === Infinity ? 1500000 : value]}
          max={1500000}
          min={100000}
          step={50000}
          value={[value === Infinity ? 1500000 : value]}
          onValueChange={handleSliderChange}
          className="py-1 cursor-pointer"
          aria-label="Maximum annual fees"
          aria-valuetext={formatLakh(value === Infinity ? 1500000 : value)}
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-2 font-medium">
          <span>₹1.0L</span>
          <span>₹8.0L</span>
          <span>₹15.0L+</span>
        </div>
      </div>
    </div>
  );
}
