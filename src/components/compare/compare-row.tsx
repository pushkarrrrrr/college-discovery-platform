"use client";

import { College } from "@/types";
import { cn } from "@/lib/utils";

interface CompareRowProps<T> {
  label: string;
  selectedColleges: College[];
  valueFn: (college: College) => T;
  renderCell?: (value: T, isBest: boolean, college: College) => React.ReactNode;
  isBestFn?: (values: T[], currentValue: T) => boolean;
}

export function CompareRow<T>({
  label,
  selectedColleges,
  valueFn,
  renderCell,
  isBestFn,
}: CompareRowProps<T>) {
  // Extract values that exist for calculating which one is "best"
  const values = selectedColleges
    .map(valueFn)
    .filter((v) => v !== undefined && v !== null && (typeof v !== "number" || !isNaN(v)));

  return (
    <tr className="border-b border-border/40 hover:bg-accent/5 transition-colors">
      {/* Sticky Parameter Column */}
      <th scope="row" className="sticky left-0 z-10 bg-card p-4 font-bold text-xs text-muted-foreground shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-border/50 text-left">
        {label}
      </th>

      {/* Render college data columns */}
      {[0, 1, 2].map((idx) => {
        const college = selectedColleges[idx];
        if (!college) {
          return (
            <td key={`empty-${idx}`} className="p-4 text-xs text-muted-foreground border-r last:border-r-0 border-border/50">
              —
            </td>
          );
        }

        const val = valueFn(college);
        const isBest = isBestFn && val !== undefined && val !== null ? isBestFn(values, val) : false;

        return (
          <td
            key={college.id}
            className={cn(
              "p-4 text-xs font-semibold text-foreground border-r last:border-r-0 border-border/50 transition-colors",
              isBest && "bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
            )}
          >
            {renderCell ? renderCell(val, isBest, college) : val !== undefined && val !== null ? String(val) : "—"}
          </td>
        );
      })}
    </tr>
  );
}
