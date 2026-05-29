"use client";

import { GitCompare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompareHeaderProps {
  hasColleges: boolean;
  onClear: () => void;
}

export function CompareHeader({ hasColleges, onClear }: CompareHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
          <GitCompare className="h-7 w-7 text-primary" />
          <span>Compare Colleges</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Analyze fees, placement packages, national rankings, and facilities side-by-side.
        </p>
      </div>
      {hasColleges && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          className="text-destructive border-border/80 hover:bg-destructive/5 hover:text-destructive font-bold transition-colors"
        >
          <Trash2 className="h-4 w-4 mr-1.5" />
          Clear Comparison
        </Button>
      )}
    </div>
  );
}
