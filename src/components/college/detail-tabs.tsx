"use client";

import { useState } from "react";
import { College } from "@/types";
import {
  OverviewSection,
  CoursesSection,
  PlacementsSection,
  ReviewsSection
} from "./detail-sections";
import { Sparkles, BookOpen, Briefcase, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetailTabsProps {
  college: College;
}

type TabType = "overview" | "courses" | "placements" | "reviews";

export function DetailTabs({ college }: DetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Sparkles },
    { id: "courses", label: "Courses & Fees", icon: BookOpen, count: college.courses.length },
    { id: "placements", label: "Placements", icon: Briefcase },
    { id: "reviews", label: "Reviews", icon: Users, count: college.reviews.length },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Tabs Selector list */}
      <div className="flex border-b border-border/80 overflow-x-auto scrollbar-none gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-3 text-sm font-extrabold border-b-2 -mb-[2px] transition-all whitespace-nowrap",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {"count" in tab && tab.count !== undefined && (
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none",
                  isActive ? "bg-primary/10 text-primary" : "bg-accent/80 text-muted-foreground"
                )}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Render active section content */}
      <div className="bg-card/30 rounded-2xl p-5 border border-border/60 shadow-xs min-h-[300px]">
        {activeTab === "overview" && <OverviewSection college={college} />}
        {activeTab === "courses" && <CoursesSection college={college} />}
        {activeTab === "placements" && <PlacementsSection college={college} />}
        {activeTab === "reviews" && <ReviewsSection college={college} />}
      </div>
    </div>
  );
}
