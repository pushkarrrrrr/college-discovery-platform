"use client";

import { College } from "@/types";
import { Briefcase } from "lucide-react";

interface SectionProps {
  college: College;
}

export function PlacementsSection({ college }: SectionProps) {
  const { placementStats } = college;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />
          <span>Placement Highlights</span>
        </h3>
        <p className="text-xs text-muted-foreground">
          Recruitment statistics and top corporate recruiters for the latest academic year.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border/80 bg-card p-5 text-center shadow-xs">
          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Average Package</div>
          <div className="text-3xl font-extrabold text-foreground mt-2">{placementStats.averageSalary} LPA</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1 bg-emerald-500/10 inline-block px-2 py-0.5 rounded">Solid Industry Standard</div>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 text-center shadow-xs">
          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Highest Package</div>
          <div className="text-3xl font-extrabold text-primary mt-2">{placementStats.highestSalary} LPA</div>
          <div className="text-[10px] text-[#B83E71] dark:text-[#FB9EC6] font-bold mt-1 bg-[#FB9EC6]/20 dark:bg-[#FB9EC6]/10 inline-block px-2 py-0.5 rounded">International Placements</div>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 text-center shadow-xs">
          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Placement Rate</div>
          <div className="text-3xl font-extrabold text-foreground mt-2">{placementStats.placementRate}%</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1 bg-emerald-500/10 inline-block px-2 py-0.5 rounded">Active Corporate Partners</div>
        </div>
      </div>

      {/* Top Recruiters Tags */}
      <div className="space-y-3 pt-2">
        <h4 className="text-sm font-bold text-foreground">Top Corporate Recruiters</h4>
        <ul className="flex flex-wrap gap-2 list-none" aria-label="Top recruiters">
          {placementStats.topRecruiters.map((recruiter, idx) => (
            <li
              key={idx}
              className="px-3.5 py-1.5 rounded-lg border border-border/80 bg-accent/20 text-xs font-bold text-muted-foreground shadow-xs"
            >
              {recruiter}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
