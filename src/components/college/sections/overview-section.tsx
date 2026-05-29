"use client";

import { College } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Building, Sparkles, Award, CheckCircle } from "lucide-react";

interface SectionProps {
  college: College;
}

export function OverviewSection({ college }: SectionProps) {
  return (
    <div className="space-y-6">
      {/* About Description */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
          <span>About the Institution</span>
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {college.description}
        </p>
      </div>

      {/* Quick Facts Card Group */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <Card className="border-border/60 bg-card/40">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Calendar className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Established</div>
              <div className="text-sm font-extrabold text-foreground">{college.established}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/40">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Building className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Type</div>
              <div className="text-sm font-extrabold text-foreground">{college.type} University</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/40">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Award className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">NIRF Rank</div>
              <div className="text-sm font-extrabold text-foreground">#{college.ranking.national} National</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campus Infrastructure List */}
      <div className="space-y-3 pt-2">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Building className="h-5 w-5 text-primary" aria-hidden="true" />
          <span>Campus Infrastructure</span>
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none" aria-label="Campus infrastructure facilities">
          {college.infrastructure.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" aria-hidden="true" />
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
