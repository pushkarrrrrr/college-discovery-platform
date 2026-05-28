"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { College } from "@/types";
import { CompareButton } from "@/components/compare/compare-button";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetailActionsProps {
  college: College;
}

export function DetailActions({ college }: DetailActionsProps) {
  const router = useRouter();
  const { savedCollegeIds, toggleSaveCollege, isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isSaved = mounted && savedCollegeIds.includes(college.id);

  const handleSaveToggle = () => {
    if (!isAuthenticated) {
      const currentPath = window.location.pathname + window.location.search;
      router.push(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
      return;
    }
    toggleSaveCollege(college.id);
  };

  return (
    <div className="flex items-center gap-3 w-full sm:w-auto">
      {/* Reusable compare button */}
      <CompareButton college={college} variant="outline" size="default" className="flex-1 sm:flex-none h-10 px-4 font-bold" />
      
      {/* Save Shortlist button */}
      <Button
        onClick={handleSaveToggle}
        variant={isSaved ? "secondary" : "default"}
        className={cn(
          "flex-1 sm:flex-none gap-1.5 h-10 px-4 font-bold transition-all shadow-sm",
          isSaved 
            ? "bg-amber-500/10 border-amber-500/20 text-amber-500 hover:bg-amber-500/20 hover:text-amber-600 border" 
            : "shadow-primary/20"
        )}
      >
        <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
        <span>{isSaved ? "Shortlisted" : "Save College"}</span>
      </Button>
    </div>
  );
}
