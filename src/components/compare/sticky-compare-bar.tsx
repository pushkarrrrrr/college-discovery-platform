"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCompareStore } from "@/store/useCompareStore";
import { Button } from "@/components/ui/button";
import { X, GitCompare, Trash2 } from "lucide-react";

export function StickyCompareBar() {
  const pathname = usePathname();
  const { selectedColleges, isDrawerOpen, removeCollege, clearCompare, setDrawerOpen } = useCompareStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;
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
      <div className="relative rounded-2xl border border-border/80 bg-card/90 p-4 pr-10 sm:pr-4 shadow-xl backdrop-blur-md">
        {/* Minimize Button */}
        <button
          onClick={() => setDrawerOpen(false)}
          className="absolute top-3 right-3 p-1 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors cursor-pointer"
          title="Minimize comparison bar"
          aria-label="Minimize comparison bar"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-2 sm:mt-0">
          
          {/* Header Status & Mobile-Only Actions */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 flex-shrink-0">
                <GitCompare className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="font-extrabold text-xs sm:text-sm text-foreground leading-none">Compare Shortlist</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5">
                  Selected {selectedColleges.length} of 3
                </p>
              </div>
            </div>

            {/* Mobile Actions: Render compact icon buttons */}
            <div className="flex sm:hidden items-center gap-1.5 mr-2">
              <Button
                variant="outline"
                size="icon"
                onClick={clearCompare}
                className="h-8 w-8 text-muted-foreground hover:text-destructive border-border/80 cursor-pointer"
                title="Clear list"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
              <Link href="/compare">
                <Button size="sm" className="h-8 px-3 text-xs font-bold gap-1 cursor-pointer">
                  <GitCompare className="h-3.5 w-3.5" />
                  <span>Compare</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* College Item Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto mt-1 sm:mt-0">
            {selectedColleges.map((college) => (
              <div
                key={college.id}
                className="group relative flex items-center gap-1.5 rounded-xl border border-border bg-background/60 p-1.5 pr-7 text-[10px] sm:text-xs font-semibold shadow-xs transition-all hover:border-primary/20 hover:bg-background"
              >
                <div className="h-5 w-5 sm:h-6 sm:w-6 overflow-hidden rounded bg-muted border border-border flex-shrink-0 relative">
                  <Image
                    src={college.logo}
                    alt={`${college.name} logo`}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="max-w-[75px] xs:max-w-[100px] truncate text-foreground">{college.name}</span>
                
                <button
                  onClick={() => removeCollege(college.id)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors cursor-pointer"
                  aria-label={`Remove ${college.name}`}
                >
                  <X className="h-3 w-3 stroke-[2.5]" />
                </button>
              </div>
            ))}

            {/* Empty slots placeholders */}
            {selectedColleges.length < 3 && (
              <div className="hidden xs:flex items-center justify-center rounded-xl border border-dashed border-border/80 px-3 py-1.5 text-[10px] sm:text-xs text-muted-foreground font-semibold bg-accent/15 select-none">
                + Add {3 - selectedColleges.length} more
              </div>
            )}
          </div>

          {/* Desktop Action Group */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearCompare}
              className="h-9 px-3 text-muted-foreground hover:text-destructive hover:bg-destructive/5 border-border/80 gap-1.5 font-bold cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear</span>
            </Button>
            
            <Link href="/compare">
              <Button size="sm" className="h-9 px-4 gap-1.5 font-bold shadow-sm shadow-primary/20 cursor-pointer">
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
