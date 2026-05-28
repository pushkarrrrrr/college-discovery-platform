"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { College } from "@/types";
import { RatingBadge } from "@/components/ui/rating-badge";
import { CompareButton } from "@/components/compare/compare-button";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Bookmark, MapPin, Landmark, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollegeCardProps {
  college: College;
  className?: string;
}

export function CollegeCard({ college, className }: CollegeCardProps) {
  const router = useRouter();
  const { savedCollegeIds, toggleSaveCollege, isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  
  const isSaved = mounted && savedCollegeIds.includes(college.id);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      const currentPath = window.location.pathname + window.location.search;
      router.push(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    toggleSaveCollege(college.id);
  };

  // Format fee band
  const formatFees = (min: number, max: number) => {
    return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L`;
  };

  return (
    <div
      className={cn(
        "group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md",
        className
      )}
    >
      <div>
        {/* Card Header Info */}
        <div className="flex items-start justify-between gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-xl border border-border bg-muted flex-shrink-0">
            <Image
              src={college.logo}
              alt={`${college.name} logo`}
              width={48}
              height={48}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          <div className="flex flex-col items-end gap-1.5">
            <span className="inline-flex items-center rounded-lg bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary border border-primary/10">
              #{college.ranking.national} NIRF
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {college.type}
            </span>
          </div>
        </div>

        {/* Name and Rating */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/colleges/${college.id}`} className="block">
              <h3 className="font-extrabold text-base text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-1">
                {college.name}
              </h3>
            </Link>
            <RatingBadge rating={college.rating} size="xs" />
          </div>

          <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
            <MapPin className="h-3 w-3 stroke-[2]" />
            <span>{college.location.city}, {college.location.state}</span>
          </p>
        </div>

        {/* Short Description */}
        <p className="text-xs text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
          {college.description}
        </p>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4 p-2.5 rounded-xl bg-accent/20 border border-border/40">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-background text-muted-foreground">
              <Landmark className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">Est. Fees</div>
              <div className="text-xs font-bold text-foreground leading-none mt-0.5">
                {formatFees(college.feesRange.min, college.feesRange.max)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-background text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">Avg Salary</div>
              <div className="text-xs font-bold text-foreground leading-none mt-0.5">
                {college.placementStats.averageSalary} LPA
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-5 pt-4 border-t border-border/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Compare check */}
          <CompareButton college={college} />
          
          {/* Bookmark save */}
          <Button
            onClick={handleSaveToggle}
            variant="outline"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-lg border-border/80 text-muted-foreground hover:bg-accent/40",
              isSaved && "bg-amber-500/10 border-amber-500/20 text-amber-500 hover:bg-amber-500/20 hover:text-amber-600"
            )}
            title={isSaved ? "Remove from shortlisted" : "Save to shortlist"}
            aria-label="Save College"
          >
            <Bookmark className={cn("h-3.5 w-3.5", isSaved && "fill-current")} />
          </Button>
        </div>

        <Link href={`/colleges/${college.id}`}>
          <Button size="sm" variant="ghost" className="text-xs font-bold text-primary hover:text-primary hover:bg-primary/5 px-2.5 h-8">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
