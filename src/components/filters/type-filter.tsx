"use client";

import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface TypeFilterProps {
  value?: "All" | "Private" | "Public";
  onChange: (type: "All" | "Private" | "Public") => void;
}

export function TypeFilter({ value = "All", onChange }: TypeFilterProps) {
  const typeOptions = ["All", "Public", "Private"] as const;

  return (
    <div className="space-y-2.5">
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        <Award className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Institution Type</span>
      </span>
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-accent/30 border border-border/50" role="group" aria-label="Institution Type filter">
        {typeOptions.map((type) => {
          const isSelected = value === type;
          return (
            <button
              key={type}
              onClick={() => onChange(type)}
              aria-pressed={isSelected}
              className={cn(
                "text-xs py-1.5 font-bold rounded-md transition-all cursor-pointer",
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
  );
}
