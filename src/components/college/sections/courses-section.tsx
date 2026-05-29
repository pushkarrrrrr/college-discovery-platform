"use client";

import { College } from "@/types";
import { BookOpen } from "lucide-react";

interface SectionProps {
  college: College;
}

export function CoursesSection({ college }: SectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
          <span>Programs Offered & Fee Structure</span>
        </h3>
        <p className="text-xs text-muted-foreground">
          Eligibility criteria and annual course fees for the undergraduate and postgraduate programs.
        </p>
      </div>

      {/* Courses List Grid/Table */}
      <div className="border border-border/80 rounded-2xl overflow-hidden bg-card/30 shadow-xs">
        
        {/* Desktop/Tablet Table Representation */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <caption className="sr-only">Programs and annual fee details for {college.name}</caption>
            <thead>
              <tr className="bg-accent/40 border-b border-border/80 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                <th scope="col" className="p-4">Course Name</th>
                <th scope="col" className="p-4">Duration</th>
                <th scope="col" className="p-4">Annual Fees</th>
                <th scope="col" className="p-4">Eligibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs font-semibold text-foreground">
              {college.courses.map((course) => (
                <tr key={course.id} className="hover:bg-accent/25 transition-colors">
                  <th scope="row" className="p-4 font-bold text-sm text-primary text-left font-sans">{course.name}</th>
                  <td className="p-4 text-muted-foreground">{course.duration}</td>
                  <td className="p-4 font-extrabold">₹{course.feesPerYear.toLocaleString("en-IN")} / yr</td>
                  <td className="p-4 text-muted-foreground font-medium">{course.eligibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked List Representation */}
        <ul className="block sm:hidden divide-y divide-border/60 list-none" aria-label="Programs and course list">
          {college.courses.map((course) => (
            <li key={course.id} className="p-4 space-y-2.5 bg-card/10">
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-extrabold text-sm text-primary">{course.name}</h4>
                <span className="inline-flex items-center rounded-md bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary flex-shrink-0">
                  {course.duration}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-1">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-bold">Annual Fees</span>
                  <span className="text-foreground font-extrabold">₹{course.feesPerYear.toLocaleString("en-IN")} / yr</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block font-bold">Eligibility</span>
                  <span className="text-muted-foreground font-medium">{course.eligibility}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
