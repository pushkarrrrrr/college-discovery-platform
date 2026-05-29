"use client";

import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortDropdownProps {
  value: "rating" | "fees_low" | "fees_high" | "placement";
  onChange: (value: "rating" | "fees_low" | "fees_high" | "placement") => void;
  className?: string;
}

export const SortDropdown = memo(function SortDropdown({
  value,
  onChange,
  className
}: SortDropdownProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Select
        value={value}
        onValueChange={(val) =>
          onChange(val as "rating" | "fees_low" | "fees_high" | "placement")
        }
      >
        <SelectTrigger className="w-[180px] h-10 bg-card border-border/80 text-xs font-semibold rounded-lg shadow-sm gap-1.5 focus:ring-primary/20">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ArrowUpDown className="h-3.5 w-3.5" />
            <span>Sort by:</span>
          </div>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-border text-xs font-medium">
          <SelectItem value="rating">Highest Rated</SelectItem>
          <SelectItem value="fees_low">Fees: Low to High</SelectItem>
          <SelectItem value="fees_high">Fees: High to Low</SelectItem>
          <SelectItem value="placement">Highest Placements</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
});
