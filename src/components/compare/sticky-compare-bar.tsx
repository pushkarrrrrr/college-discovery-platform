"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCompareStore } from "@/store/useCompareStore";
import { Button } from "@/components/ui/button";
import { X, GitCompare, Trash2 } from "lucide-react";

export function StickyCompareBar() {
  const pathname = usePathname();
  const { selectedColleges, isDrawerOpen, removeCollege, clearCompare, setDrawerOpen } = useCompareStore();

  if (pathname === "/compare") return null;
  if (selectedColleges.length === 0) return null;

  // 1. Minimized View: Render a small floating launch button at the bottom-right corner
  if (!isDrawerOpen) {
    return (
      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all cursor-pointer animate-in fade-in zoom-in-50 duration-200"
        aria-label="Open comparison shortlist"
        title="Open comparison shortlist"
      >
        <GitCompare className="h-6 w-6" />
        <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold border-2 border-background animate-pulse">
          {selectedColleges.length}
        </span>
      </button>
    );
  }

  // 2. Full Expanded View
  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-full max-w-4xl -translate-x-1/2 px-4 md:px-0 animate-in slide-in-from-bottom-8 duration-300">
      <div className="relative rounded-2xl border border-border/80 bg-card/90 p-4 pr-10 md:pr-4 shadow-xl backdrop-blur-md">
        {/* Minimize Button */}
        <button
          onClick={() => setDrawerOpen(false)}
          className="absolute top-3 right-3 p-1 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors cursor-pointer"
          title="Minimize comparison bar"
          aria-label="Minimize comparison bar"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2 md:mt-0">
          
          {/* Header Status */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <GitCompare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">Compare Shortlist</h3>
              <p className="text-xs text-muted-foreground font-medium">
                Selected {selectedColleges.length} of 3 colleges
              </p>
            </div>
          </div>

          {/* College Item Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {selectedColleges.map((college) => (
              <div
                key={college.id}
                className="group relative flex items-center gap-2 rounded-xl border border-border bg-background/60 p-1.5 pr-8 text-xs font-semibold shadow-sm transition-all hover:border-primary/20 hover:bg-background"
              >
                <div className="h-6 w-6 overflow-hidden rounded bg-muted border border-border flex-shrink-0">
                  <Image
                    src={college.logo}
                    alt={`${college.name} logo`}
                    width={24}
                    height={24}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="max-w-[110px] truncate text-foreground">{college.name}</span>
                
                <button
                  onClick={() => removeCollege(college.id)}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                  aria-label={`Remove ${college.name}`}
                >
                  <X className="h-3.5 w-3.5 stroke-[2]" />
                </button>
              </div>
            ))}

            {/* Empty slots placeholders */}
            {selectedColleges.length < 3 && (
              <div className="hidden sm:flex items-center justify-center rounded-xl border border-dashed border-border/80 px-4 py-2 text-xs text-muted-foreground font-semibold bg-accent/15 select-none">
                + Add {3 - selectedColleges.length} more
              </div>
            )}
          </div>

          {/* Action Group */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={clearCompare}
              className="h-9 px-3 text-muted-foreground hover:text-destructive hover:bg-destructive/5 border-border/80 gap-1.5 font-bold"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear</span>
            </Button>
            
            <Link href="/compare" className="flex-1 md:flex-none">
              <Button size="sm" className="h-9 w-full px-4 gap-1.5 font-bold shadow-sm shadow-primary/20">
                <GitCompare className="h-4 w-4" />
                <span>Compare Now</span>
              </Button>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
