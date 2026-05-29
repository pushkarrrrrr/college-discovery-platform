"use client";

import Link from "next/link";
import { GitCompare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CompareEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border/80 rounded-2xl bg-card/30 text-center px-4">
      <GitCompare className="h-12 w-12 text-muted-foreground/60 stroke-[1.2] animate-pulse" />
      <h3 className="font-extrabold text-lg mt-4 text-foreground">No colleges selected</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm">
        Select up to 3 colleges from the exploration catalog to compare key metrics side-by-side.
      </p>
      <Link href="/colleges" className="mt-6">
        <Button size="sm" className="gap-1.5 font-bold shadow-md shadow-primary/20">
          <Plus className="h-4 w-4" />
          <span>Add Colleges</span>
        </Button>
      </Link>
    </div>
  );
}
