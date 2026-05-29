"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCompareStore } from "@/store/useCompareStore";
import { Button } from "@/components/ui/button";
import { RatingBadge } from "@/components/ui/rating-badge";
import { ArrowLeft, Sparkles, CheckCircle } from "lucide-react";
import { CompareHeader } from "@/components/compare/compare-header";
import { CompareEmptyState } from "@/components/compare/compare-empty-state";
import { CompareTable } from "@/components/compare/compare-table";
import { CompareRow } from "@/components/compare/compare-row";
import { CompareSectionHeader } from "@/components/compare/compare-section-header";

export default function ComparePage() {
  const { selectedColleges, removeCollege, clearCompare } = useCompareStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Format fee numbers
  const formatFees = (amount: number) => {
    return `₹${(amount / 100000).toFixed(1)}L`;
  };

  if (!mounted) {
    return (
      <div className="flex flex-col gap-6 py-6 animate-fade-in">
        <div>
          <Button render={<Link href="/colleges" />} variant="ghost" size="sm" className="gap-1.5 -ml-2 text-muted-foreground hover:text-foreground font-bold">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            <span>Back to colleges</span>
          </Button>
        </div>
        <div className="h-[400px] flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-6 animate-fade-in">
      {/* Breadcrumbs */}
      <div>
        <Button render={<Link href="/colleges" />} variant="ghost" size="sm" className="gap-1.5 -ml-2 text-muted-foreground hover:text-foreground font-bold">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          <span>Back to colleges</span>
        </Button>
      </div>

      {/* Header section */}
      <CompareHeader hasColleges={selectedColleges.length > 0} onClear={clearCompare} />

      {selectedColleges.length === 0 ? (
        <CompareEmptyState />
      ) : (
        <div className="space-y-6">
          <CompareTable selectedColleges={selectedColleges} onRemove={removeCollege}>
            {/* --- Section: Overview --- */}
            <CompareSectionHeader label="General Overview" />
            
            <CompareRow
              label="Affiliation Type"
              selectedColleges={selectedColleges}
              valueFn={(c) => `${c.type} Institute`}
            />

            <CompareRow
              label="Established Year"
              selectedColleges={selectedColleges}
              valueFn={(c) => c.established}
            />

            {/* --- Section: Rankings --- */}
            <CompareSectionHeader label="Rankings & Ratings" />

            <CompareRow
              label="NIRF National Rank"
              selectedColleges={selectedColleges}
              valueFn={(c) => c.ranking.national}
              isBestFn={(vals, cur) => cur === Math.min(...vals)}
              renderCell={(val, isBest) => (
                <div className="flex items-center gap-1.5 font-extrabold">
                  <span>#{val}</span>
                  {isBest && <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-emerald-500 animate-bounce" />}
                </div>
              )}
            />

            <CompareRow
              label="Overall Student Rating"
              selectedColleges={selectedColleges}
              valueFn={(c) => c.rating}
              isBestFn={(vals, cur) => cur === Math.max(...vals)}
              renderCell={(val, isBest, college) => (
                <div className="flex items-center gap-2">
                  <RatingBadge rating={val} size="xs" />
                  <span className="text-[10px] text-muted-foreground">({college.reviewsCount} reviews)</span>
                  {isBest && <CheckCircle aria-hidden="true" className="h-3.5 w-3.5 text-emerald-500" />}
                </div>
              )}
            />

            {/* --- Section: Placement Stats --- */}
            <CompareSectionHeader label="Placements & Recruiters" />

            <CompareRow
              label="Average Package (LPA)"
              selectedColleges={selectedColleges}
              valueFn={(c) => c.placementStats.averageSalary}
              isBestFn={(vals, cur) => cur === Math.max(...vals)}
              renderCell={(val, isBest) => (
                <div className="flex items-center gap-1.5 font-extrabold text-foreground">
                  <span>{val} LPA</span>
                  {isBest && <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-emerald-500" />}
                </div>
              )}
            />

            <CompareRow
              label="Highest Package (LPA)"
              selectedColleges={selectedColleges}
              valueFn={(c) => c.placementStats.highestSalary}
              isBestFn={(vals, cur) => cur === Math.max(...vals)}
              renderCell={(val, isBest) => (
                <div className="flex items-center gap-1.5 font-extrabold text-foreground">
                  <span>{val} LPA</span>
                  {isBest && <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-emerald-500" />}
                </div>
              )}
            />

            <CompareRow
              label="Placement Rate"
              selectedColleges={selectedColleges}
              valueFn={(c) => c.placementStats.placementRate}
              isBestFn={(vals, cur) => cur === Math.max(...vals)}
              renderCell={(val, isBest) => (
                <div className="flex items-center gap-1.5 text-foreground">
                  <span>{val}%</span>
                  {isBest && <CheckCircle aria-hidden="true" className="h-3.5 w-3.5 text-emerald-500" />}
                </div>
              )}
            />

            <CompareRow
              label="Top Recruiters"
              selectedColleges={selectedColleges}
              valueFn={(c) => c.placementStats.topRecruiters}
              renderCell={(recruiters) => (
                <div className="flex flex-wrap gap-1">
                  {recruiters.map((recru, rid) => (
                    <span key={rid} className="inline-flex items-center rounded-md bg-accent/80 border border-border px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                      {recru}
                    </span>
                  ))}
                </div>
              )}
            />

            {/* --- Section: Costs & Fees --- */}
            <CompareSectionHeader label="Fees & Academics" />

            <CompareRow
              label="Minimum Fees / yr"
              selectedColleges={selectedColleges}
              valueFn={(c) => c.feesRange.min}
              isBestFn={(vals, cur) => cur === Math.min(...vals)}
              renderCell={(val, isBest) => (
                <div className="flex items-center gap-1.5 font-extrabold text-foreground">
                  <span>{formatFees(val)}</span>
                  {isBest && <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-emerald-500" />}
                </div>
              )}
            />

            <CompareRow
              label="Maximum Fees / yr"
              selectedColleges={selectedColleges}
              valueFn={(c) => c.feesRange.max}
              isBestFn={(vals, cur) => cur === Math.min(...vals)}
              renderCell={(val, isBest) => (
                <div className="flex items-center gap-1.5 font-extrabold text-foreground">
                  <span>{formatFees(val)}</span>
                  {isBest && <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-emerald-500" />}
                </div>
              )}
            />

            <CompareRow
              label="Available Courses"
              selectedColleges={selectedColleges}
              valueFn={(c) => `${c.courses.length} Main Courses`}
            />

            {/* --- Section: Infrastructure --- */}
            <CompareSectionHeader label="Facilities & Infrastructure" />

            <CompareRow
              label="Campus Features"
              selectedColleges={selectedColleges}
              valueFn={(c) => c.infrastructure}
              renderCell={(infra) => (
                <div className="flex flex-wrap gap-1">
                  {infra.map((facility, fid) => (
                    <span key={fid} className="inline-flex items-center rounded-md bg-primary/5 border border-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                      {facility}
                    </span>
                  ))}
                </div>
              )}
            />
          </CompareTable>

          {/* Prompt notice */}
          <p className="text-center text-xs text-muted-foreground font-medium">
            * Highlight indicators identify the best metrics across selected colleges.
          </p>
        </div>
      )}
    </div>
  );
}
