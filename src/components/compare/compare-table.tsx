"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { College } from "@/types";
import { cn } from "@/lib/utils";

interface CompareTableProps {
  selectedColleges: College[];
  onRemove: (id: string) => void;
  children: React.ReactNode;
}

export function CompareTable({ selectedColleges, onRemove, children }: CompareTableProps) {
  // Scale minimum width dynamically to optimize layout spacing on mobile/tablet viewports
  const minWidthClass = {
    0: "min-w-[500px]",
    1: "min-w-[500px]",
    2: "min-w-[700px]",
    3: "min-w-[950px]",
  }[selectedColleges.length] || "min-w-[950px]";

  return (
    <div className="border border-border/80 rounded-2xl bg-card/50 overflow-hidden shadow-xs backdrop-blur-md">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-muted">
        <table className={cn("w-full table-fixed border-collapse", minWidthClass)}>
          <caption className="sr-only">Compare Colleges Overview</caption>
          <thead>
            <tr className="border-b border-border/80 bg-accent/10">
              {/* Sticky parameter column */}
              <th scope="col" className="sticky left-0 z-10 w-[200px] bg-card p-5 text-left font-extrabold text-sm text-foreground shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-border/50">
                College Summary
              </th>
              
              {/* College headers */}
              {[0, 1, 2].map((index) => {
                const college = selectedColleges[index];
                if (!college) {
                  return (
                    <th scope="col" key={`empty-${index}`} className="w-[250px] p-5 text-center align-top border-r last:border-r-0 border-border/50">
                      <div className="flex flex-col items-center justify-center h-28 rounded-xl border-2 border-dashed border-border/80 bg-accent/5 p-4">
                        <Plus aria-hidden="true" className="h-5 w-5 text-muted-foreground/60 mb-1.5 stroke-[2]" />
                        <Button render={<Link href="/colleges" />} size="xs" variant="outline" className="text-[10px] font-bold h-7">
                          Add College
                        </Button>
                      </div>
                    </th>
                  );
                }

                return (
                  <th scope="col" key={college.id} className="w-[250px] p-5 text-left align-top relative group border-r last:border-r-0 border-border/50">
                    {/* Close action */}
                    <button
                      onClick={() => onRemove(college.id)}
                      className="absolute top-4 right-4 h-6 w-6 rounded-full bg-accent/40 hover:bg-destructive/10 hover:text-destructive flex items-center justify-center text-muted-foreground transition-colors cursor-pointer"
                      aria-label={`Remove ${college.name} from comparison`}
                    >
                      <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
                    </button>

                    {/* Quick identity */}
                    <div className="space-y-3 pr-4">
                      <div className="h-12 w-12 overflow-hidden rounded-xl border border-border bg-background relative">
                        <Image src={college.logo} alt="" fill className="object-cover" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-extrabold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                          {college.name}
                        </h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin aria-hidden="true" className="h-3 w-3" />
                          <span>{college.location.city}, {college.location.state}</span>
                        </p>
                      </div>
                      <div>
                        <Button render={<Link href={`/colleges/${college.id}`} />} variant="ghost" size="xs" className="text-[10px] font-bold text-primary hover:bg-primary/5 gap-1 h-7">
                          <span>View Profile</span>
                          <ExternalLink aria-hidden="true" className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}
