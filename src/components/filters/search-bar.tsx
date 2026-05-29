"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search by college name, city, state, or course...",
  className
}: SearchBarProps) {
  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className={cn("relative flex items-center w-full", className)}
    >
      <Search className="absolute left-3.5 h-4.5 w-4.5 text-muted-foreground/75 pointer-events-none stroke-[2]" aria-hidden="true" />
      
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search colleges by name, city, state, or course"
        className="pl-11 pr-10 h-11 w-full bg-card/60 border-border/80 rounded-xl text-sm font-medium shadow-sm transition-all focus-visible:bg-card focus-visible:ring-primary/20"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3.5 p-0.5 rounded-full text-muted-foreground/60 hover:bg-accent hover:text-foreground transition-all cursor-pointer"
          aria-label="Clear search query"
        >
          <X className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
        </button>
      )}
    </form>
  );
}
