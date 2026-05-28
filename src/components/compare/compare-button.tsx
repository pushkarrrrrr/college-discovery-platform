"use client";

import { useCompareStore } from "@/store/useCompareStore";
import { College } from "@/types";
import { Button } from "@/components/ui/button";
import { GitCompare, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CompareButtonProps {
  college: College;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "default" | "icon";
  className?: string;
}

export function CompareButton({
  college,
  variant = "outline",
  size = "sm",
  className
}: CompareButtonProps) {
  const { selectedColleges, addCollege, removeCollege } = useCompareStore();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isSelected = selectedColleges.some((c) => c.id === college.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if this button is inside a card anchor
    e.stopPropagation();

    if (isSelected) {
      removeCollege(college.id);
      setErrorMsg(null);
    } else {
      const result = addCollege(college);
      if (!result.success && result.message) {
        setErrorMsg(result.message);
        // Clear message after 3 seconds
        setTimeout(() => setErrorMsg(null), 3000);
      }
    }
  };

  return (
    <div className="relative inline-block">
      <Button
        onClick={handleToggle}
        variant={isSelected ? "secondary" : variant}
        size={size === "icon" ? "icon" : size}
        className={cn(
          "gap-1.5 font-bold transition-all text-xs",
          isSelected
            ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
            : "hover:bg-accent/40 border-border/80 text-muted-foreground hover:text-foreground",
          className
        )}
      >
        {isSelected ? (
          <>
            <Check className="h-3.5 w-3.5 stroke-[3]" />
            {size !== "icon" && <span>Compared</span>}
          </>
        ) : (
          <>
            <GitCompare className="h-3.5 w-3.5" />
            {size !== "icon" && <span>Compare</span>}
          </>
        )}
      </Button>

      {/* Floating notification for comparison limit */}
      {errorMsg && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 text-center bg-destructive text-destructive-foreground text-[10px] py-1.5 px-2.5 rounded-lg shadow-lg font-bold animate-in fade-in slide-in-from-bottom-2 duration-200 z-10">
          {errorMsg}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-destructive" />
        </div>
      )}
    </div>
  );
}
