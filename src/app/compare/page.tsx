"use client";

import Link from "next/link";
import Image from "next/image";
import { useCompareStore } from "@/store/useCompareStore";
import { Button } from "@/components/ui/button";
import { RatingBadge } from "@/components/ui/rating-badge";
import { GitCompare, Plus, Trash2, ArrowLeft, Sparkles, MapPin, CheckCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ComparePage() {
  const { selectedColleges, removeCollege, clearCompare } = useCompareStore();

  // Helper values to highlight the "best" in comparison
  const calculateBestValues = () => {
    if (selectedColleges.length <= 1) return {};

    const nationalRanks = selectedColleges.map((c) => c.ranking.national).filter(Boolean);
    const ratings = selectedColleges.map((c) => c.rating);
    const minFees = selectedColleges.map((c) => c.feesRange.min);
    const maxFees = selectedColleges.map((c) => c.feesRange.max);
    const averageSalaries = selectedColleges.map((c) => c.placementStats.averageSalary);
    const highestSalaries = selectedColleges.map((c) => c.placementStats.highestSalary);
    const placementRates = selectedColleges.map((c) => c.placementStats.placementRate);

    return {
      bestNIRF: nationalRanks.length > 0 ? Math.min(...nationalRanks) : null,
      bestRating: Math.max(...ratings),
      bestMinFees: Math.min(...minFees),
      bestMaxFees: Math.min(...maxFees),
      bestAvgSalary: Math.max(...averageSalaries),
      bestHighestSalary: Math.max(...highestSalaries),
      bestPlacementRate: Math.max(...placementRates),
    };
  };

  const bestMetrics = calculateBestValues();

  // Format fee numbers
  const formatFees = (amount: number) => {
    return `₹${(amount / 100000).toFixed(1)}L`;
  };

  return (
    <div className="flex flex-col gap-6 py-6 animate-fade-in">
      {/* Breadcrumbs */}
      <div>
        <Link href="/colleges">
          <Button variant="ghost" size="sm" className="gap-1.5 -ml-2 text-muted-foreground hover:text-foreground font-bold">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to colleges</span>
          </Button>
        </Link>
      </div>

      {/* Header section */}
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
        {selectedColleges.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearCompare}
            className="text-destructive border-border/80 hover:bg-destructive/5 hover:text-destructive font-bold transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-1.5" />
            Clear Comparison
          </Button>
        )}
      </div>

      {selectedColleges.length === 0 ? (
        /* Empty State */
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
      ) : (
        <div className="space-y-6">
          {/* Main Comparison Matrix wrapper for mobile horizontal scroll */}
          <div className="border border-border/80 rounded-2xl bg-card/50 overflow-hidden shadow-xs backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] table-fixed border-collapse">
                <thead>
                  <tr className="border-b border-border/80 bg-accent/10">
                    {/* Sticky parameter column */}
                    <th className="sticky left-0 z-10 w-[200px] bg-card p-5 text-left font-extrabold text-sm text-foreground shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-border/50">
                      College Summary
                    </th>
                    
                    {/* College headers */}
                    {[0, 1, 2].map((index) => {
                      const college = selectedColleges[index];
                      if (!college) {
                        return (
                          <th key={`empty-${index}`} className="w-[250px] p-5 text-center align-top border-r last:border-r-0 border-border/50">
                            <div className="flex flex-col items-center justify-center h-28 rounded-xl border-2 border-dashed border-border/80 bg-accent/5 p-4">
                              <Plus className="h-5 w-5 text-muted-foreground/60 mb-1.5 stroke-[2]" />
                              <Link href="/colleges">
                                <Button size="xs" variant="outline" className="text-[10px] font-bold h-7">
                                  Add College
                                </Button>
                              </Link>
                            </div>
                          </th>
                        );
                      }

                      return (
                        <th key={college.id} className="w-[250px] p-5 text-left align-top relative group border-r last:border-r-0 border-border/50">
                          {/* Close action */}
                          <button
                            onClick={() => removeCollege(college.id)}
                            className="absolute top-4 right-4 h-6 w-6 rounded-full bg-accent/40 hover:bg-destructive/10 hover:text-destructive flex items-center justify-center text-muted-foreground transition-colors cursor-pointer"
                            title="Remove college"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>

                          {/* Quick identity */}
                          <div className="space-y-3 pr-4">
                            <div className="h-12 w-12 overflow-hidden rounded-xl border border-border bg-background relative">
                              <Image src={college.logo} alt={college.name} fill className="object-cover" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-extrabold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                                {college.name}
                              </h3>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{college.location.city}, {college.location.state}</span>
                              </p>
                            </div>
                            <div>
                              <Link href={`/colleges/${college.id}`}>
                                <Button variant="ghost" size="xs" className="text-[10px] font-bold text-primary hover:bg-primary/5 gap-1 h-7">
                                  <span>View Profile</span>
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                
                <tbody>
                  {/* --- Section: Overview --- */}
                  <tr className="border-b border-border/40 bg-accent/5">
                    <td colSpan={4} className="p-3 text-[10px] uppercase font-bold tracking-wider text-muted-foreground pl-5">
                      General Overview
                    </td>
                  </tr>
                  
                  <tr className="border-b border-border/40 hover:bg-accent/5 transition-colors">
                    <td className="sticky left-0 z-10 bg-card p-4 font-bold text-xs text-muted-foreground shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-border/50">
                      Affiliation Type
                    </td>
                    {[0, 1, 2].map((idx) => {
                      const college = selectedColleges[idx];
                      return (
                        <td key={idx} className="p-4 text-xs font-semibold text-foreground border-r last:border-r-0 border-border/50">
                          {college ? `${college.type} Institute` : "—"}
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="border-b border-border/40 hover:bg-accent/5 transition-colors">
                    <td className="sticky left-0 z-10 bg-card p-4 font-bold text-xs text-muted-foreground shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-border/50">
                      Established Year
                    </td>
                    {[0, 1, 2].map((idx) => {
                      const college = selectedColleges[idx];
                      return (
                        <td key={idx} className="p-4 text-xs font-semibold text-foreground border-r last:border-r-0 border-border/50">
                          {college ? college.established : "—"}
                        </td>
                      );
                    })}
                  </tr>

                  {/* --- Section: Rankings --- */}
                  <tr className="border-b border-border/40 bg-accent/5">
                    <td colSpan={4} className="p-3 text-[10px] uppercase font-bold tracking-wider text-muted-foreground pl-5">
                      Rankings & Ratings
                    </td>
                  </tr>

                  <tr className="border-b border-border/40 hover:bg-accent/5 transition-colors">
                    <td className="sticky left-0 z-10 bg-card p-4 font-bold text-xs text-muted-foreground shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-border/50">
                      NIRF National Rank
                    </td>
                    {[0, 1, 2].map((idx) => {
                      const college = selectedColleges[idx];
                      if (!college) return <td key={idx} className="p-4 text-xs text-muted-foreground border-r last:border-r-0 border-border/50">—</td>;
                      
                      const isBest = bestMetrics.bestNIRF && college.ranking.national === bestMetrics.bestNIRF;
                      return (
                        <td key={idx} className={cn("p-4 text-xs font-extrabold border-r last:border-r-0 border-border/50 transition-colors", isBest && "bg-emerald-500/5 text-emerald-600 dark:text-emerald-400")}>
                          <div className="flex items-center gap-1.5">
                            <span>#{college.ranking.national}</span>
                            {isBest && <Sparkles className="h-3.5 w-3.5 text-emerald-500 animate-bounce" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="border-b border-border/40 hover:bg-accent/5 transition-colors">
                    <td className="sticky left-0 z-10 bg-card p-4 font-bold text-xs text-muted-foreground shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-border/50">
                      Overall Student Rating
                    </td>
                    {[0, 1, 2].map((idx) => {
                      const college = selectedColleges[idx];
                      if (!college) return <td key={idx} className="p-4 text-xs text-muted-foreground border-r last:border-r-0 border-border/50">—</td>;
                      
                      const isBest = bestMetrics.bestRating && college.rating === bestMetrics.bestRating;
                      return (
                        <td key={idx} className={cn("p-4 text-xs font-semibold border-r last:border-r-0 border-border/50 transition-colors", isBest && "bg-emerald-500/5")}>
                          <div className="flex items-center gap-2">
                            <RatingBadge rating={college.rating} size="xs" />
                            <span className="text-[10px] text-muted-foreground">({college.reviewsCount} reviews)</span>
                            {isBest && <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* --- Section: Placement Stats --- */}
                  <tr className="border-b border-border/40 bg-accent/5">
                    <td colSpan={4} className="p-3 text-[10px] uppercase font-bold tracking-wider text-muted-foreground pl-5">
                      Placements & Recruiters
                    </td>
                  </tr>

                  <tr className="border-b border-border/40 hover:bg-accent/5 transition-colors">
                    <td className="sticky left-0 z-10 bg-card p-4 font-bold text-xs text-muted-foreground shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-border/50">
                      Average Package (LPA)
                    </td>
                    {[0, 1, 2].map((idx) => {
                      const college = selectedColleges[idx];
                      if (!college) return <td key={idx} className="p-4 text-xs text-muted-foreground border-r last:border-r-0 border-border/50">—</td>;
                      
                      const isBest = bestMetrics.bestAvgSalary && college.placementStats.averageSalary === bestMetrics.bestAvgSalary;
                      return (
                        <td key={idx} className={cn("p-4 text-xs font-extrabold text-foreground border-r last:border-r-0 border-border/50 transition-colors", isBest && "bg-emerald-500/5 text-emerald-600 dark:text-emerald-400")}>
                          <div className="flex items-center gap-1.5">
                            <span>{college.placementStats.averageSalary} LPA</span>
                            {isBest && <Sparkles className="h-3.5 w-3.5 text-emerald-500" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="border-b border-border/40 hover:bg-accent/5 transition-colors">
                    <td className="sticky left-0 z-10 bg-card p-4 font-bold text-xs text-muted-foreground shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-border/50">
                      Highest Package (LPA)
                    </td>
                    {[0, 1, 2].map((idx) => {
                      const college = selectedColleges[idx];
                      if (!college) return <td key={idx} className="p-4 text-xs text-muted-foreground border-r last:border-r-0 border-border/50">—</td>;
                      
                      const isBest = bestMetrics.bestHighestSalary && college.placementStats.highestSalary === bestMetrics.bestHighestSalary;
                      return (
                        <td key={idx} className={cn("p-4 text-xs font-extrabold text-foreground border-r last:border-r-0 border-border/50 transition-colors", isBest && "bg-emerald-500/5 text-emerald-600 dark:text-emerald-400")}>
                          <div className="flex items-center gap-1.5">
                            <span>{college.placementStats.highestSalary} LPA</span>
                            {isBest && <Sparkles className="h-3.5 w-3.5 text-emerald-500" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="border-b border-border/40 hover:bg-accent/5 transition-colors">
                    <td className="sticky left-0 z-10 bg-card p-4 font-bold text-xs text-muted-foreground shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-border/50">
                      Placement Rate
                    </td>
                    {[0, 1, 2].map((idx) => {
                      const college = selectedColleges[idx];
                      if (!college) return <td key={idx} className="p-4 text-xs text-muted-foreground border-r last:border-r-0 border-border/50">—</td>;
                      
                      const isBest = bestMetrics.bestPlacementRate && college.placementStats.placementRate === bestMetrics.bestPlacementRate;
                      return (
                        <td key={idx} className={cn("p-4 text-xs font-semibold text-foreground border-r last:border-r-0 border-border/50 transition-colors", isBest && "bg-emerald-500/5 text-emerald-600 dark:text-emerald-400")}>
                          <div className="flex items-center gap-1.5">
                            <span>{college.placementStats.placementRate}%</span>
                            {isBest && <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="border-b border-border/40 hover:bg-accent/5 transition-colors">
                    <td className="sticky left-0 z-10 bg-card p-4 font-bold text-xs text-muted-foreground shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-border/50">
                      Top Recruiters
                    </td>
                    {[0, 1, 2].map((idx) => {
                      const college = selectedColleges[idx];
                      return (
                        <td key={idx} className="p-4 text-xs text-foreground border-r last:border-r-0 border-border/50">
                          {college ? (
                            <div className="flex flex-wrap gap-1">
                              {college.placementStats.topRecruiters.map((recru, rid) => (
                                <span key={rid} className="inline-flex items-center rounded-md bg-accent/80 border border-border px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                                  {recru}
                                </span>
                              ))}
                            </div>
                          ) : (
                            "—"
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* --- Section: Costs & Fees --- */}
                  <tr className="border-b border-border/40 bg-accent/5">
                    <td colSpan={4} className="p-3 text-[10px] uppercase font-bold tracking-wider text-muted-foreground pl-5">
                      Fees & Academics
                    </td>
                  </tr>

                  <tr className="border-b border-border/40 hover:bg-accent/5 transition-colors">
                    <td className="sticky left-0 z-10 bg-card p-4 font-bold text-xs text-muted-foreground shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-border/50">
                      Minimum Fees / yr
                    </td>
                    {[0, 1, 2].map((idx) => {
                      const college = selectedColleges[idx];
                      if (!college) return <td key={idx} className="p-4 text-xs text-muted-foreground border-r last:border-r-0 border-border/50">—</td>;
                      
                      const isBest = bestMetrics.bestMinFees && college.feesRange.min === bestMetrics.bestMinFees;
                      return (
                        <td key={idx} className={cn("p-4 text-xs font-extrabold text-foreground border-r last:border-r-0 border-border/50 transition-colors", isBest && "bg-emerald-500/5 text-emerald-600 dark:text-emerald-400")}>
                          <div className="flex items-center gap-1.5">
                            <span>{formatFees(college.feesRange.min)}</span>
                            {isBest && <Sparkles className="h-3.5 w-3.5 text-emerald-500" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="border-b border-border/40 hover:bg-accent/5 transition-colors">
                    <td className="sticky left-0 z-10 bg-card p-4 font-bold text-xs text-muted-foreground shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-border/50">
                      Maximum Fees / yr
                    </td>
                    {[0, 1, 2].map((idx) => {
                      const college = selectedColleges[idx];
                      if (!college) return <td key={idx} className="p-4 text-xs text-muted-foreground border-r last:border-r-0 border-border/50">—</td>;
                      
                      const isBest = bestMetrics.bestMaxFees && college.feesRange.max === bestMetrics.bestMaxFees;
                      return (
                        <td key={idx} className={cn("p-4 text-xs font-extrabold text-foreground border-r last:border-r-0 border-border/50 transition-colors", isBest && "bg-emerald-500/5 text-emerald-600 dark:text-emerald-400")}>
                          <div className="flex items-center gap-1.5">
                            <span>{formatFees(college.feesRange.max)}</span>
                            {isBest && <Sparkles className="h-3.5 w-3.5 text-emerald-500" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  <tr className="border-b border-border/40 hover:bg-accent/5 transition-colors">
                    <td className="sticky left-0 z-10 bg-card p-4 font-bold text-xs text-muted-foreground shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-border/50">
                      Available Courses
                    </td>
                    {[0, 1, 2].map((idx) => {
                      const college = selectedColleges[idx];
                      return (
                        <td key={idx} className="p-4 text-xs font-semibold text-foreground border-r last:border-r-0 border-border/50">
                          {college ? `${college.courses.length} Main Courses` : "—"}
                        </td>
                      );
                    })}
                  </tr>

                  {/* --- Section: Infrastructure --- */}
                  <tr className="border-b border-border/40 bg-accent/5">
                    <td colSpan={4} className="p-3 text-[10px] uppercase font-bold tracking-wider text-muted-foreground pl-5">
                      Facilities & Infrastructure
                    </td>
                  </tr>

                  <tr className="hover:bg-accent/5 transition-colors">
                    <td className="sticky left-0 z-10 bg-card p-4 font-bold text-xs text-muted-foreground shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-border/50">
                      Campus Features
                    </td>
                    {[0, 1, 2].map((idx) => {
                      const college = selectedColleges[idx];
                      return (
                        <td key={idx} className="p-4 text-xs text-foreground border-r last:border-r-0 border-border/50">
                          {college ? (
                            <div className="flex flex-wrap gap-1">
                              {college.infrastructure.map((facility, fid) => (
                                <span key={fid} className="inline-flex items-center rounded-md bg-primary/5 border border-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                                  {facility}
                                </span>
                              ))}
                            </div>
                          ) : (
                            "—"
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Prompt notice */}
          <p className="text-center text-xs text-muted-foreground font-medium">
            * Highlight indicators identify the best metrics across selected colleges.
          </p>
        </div>
      )}
    </div>
  );
}
