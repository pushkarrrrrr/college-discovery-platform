import { CollegeService } from "@/services/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

// UI primitives & components
import { Button } from "@/components/ui/button";
import { RatingBadge } from "@/components/ui/rating-badge";
import { DetailTabs } from "@/components/college/detail-tabs";
import { DetailActions } from "@/components/college/detail-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronLeft,
  MapPin,
  Calendar,
  Building,
  Award,
  Landmark,
  Briefcase,
  FileText
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

// 1. Dynamic metadata generation for SEO optimization
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const college = await CollegeService.getCollegeById(id);

  if (!college) {
    return {
      title: "College Not Found — EduDiscover",
    };
  }

  return {
    title: `${college.name} — Fees, Placements & Reviews | EduDiscover`,
    description: `Get detailed information about ${college.name} located in ${college.location.city}, ${college.location.state}. Explore fees range, courses, placement statistics, and reviews.`,
  };
}

export default async function CollegeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const college = await CollegeService.getCollegeById(id);

  if (!college) {
    notFound();
  }

  // Format fee range
  const formatFees = (min: number, max: number) => {
    return `₹${(min / 100000).toFixed(1)}L - ₹${(max / 100000).toFixed(1)}L / yr`;
  };

  return (
    <div className="flex flex-col gap-6 py-4 animate-fade-in">
      {/* Back navigation breadcrumb */}
      <div>
        <Link href="/colleges">
          <Button variant="ghost" size="sm" className="gap-1.5 -ml-2 text-muted-foreground hover:text-foreground font-bold">
            <ChevronLeft className="h-4 w-4 stroke-[2.5]" />
            <span>Explore Catalog</span>
          </Button>
        </Link>
      </div>

      {/* Hero Header Card */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs">
        {/* Cover Image Background */}
        <div className="h-44 sm:h-56 md:h-64 bg-muted relative">
          <Image
            src={college.coverImage}
            alt={college.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
        </div>

        {/* Hero Info Area */}
        <div className="relative px-6 pb-6 pt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 -mt-16 sm:-mt-20 md:-mt-12">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6">
            {/* Logo box */}
            <div className="h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl border-4 border-card bg-card shadow-md flex-shrink-0 relative">
              <Image
                src={college.logo}
                alt={`${college.name} logo`}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Titles */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-lg bg-primary/10 border border-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                  NIRF National Rank #{college.ranking.national}
                </span>
                <RatingBadge rating={college.rating} size="xs" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                {college.name}
              </h1>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground font-semibold">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{college.location.city}, {college.location.state}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Established {college.established}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Building className="h-3.5 w-3.5" />
                  <span>{college.type} Institute</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons (Bookmark & Compare client component) */}
          <DetailActions college={college} />
        </div>
      </div>

      {/* Main Grid: Details tabs & Sidebar facts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Tab switcher contents (2/3 width) */}
        <div className="lg:col-span-2">
          <DetailTabs college={college} />
        </div>

        {/* Right Column: Quick Facts Sidebar (1/3 width) */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border/80 bg-card shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-foreground">Quick Facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Rank info */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent text-muted-foreground border border-border/40">
                  <Award className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">NIRF Ranking</div>
                  <div className="text-xs font-bold text-foreground mt-0.5">#{college.ranking.national} National Rank</div>
                </div>
              </div>

              {/* Type info */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent text-muted-foreground border border-border/40">
                  <Building className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Affiliation Type</div>
                  <div className="text-xs font-bold text-foreground mt-0.5">{college.type} University</div>
                </div>
              </div>

              {/* Fees info */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent text-muted-foreground border border-border/40">
                  <Landmark className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Annual Fees range</div>
                  <div className="text-xs font-bold text-foreground mt-0.5">
                    {formatFees(college.feesRange.min, college.feesRange.max)}
                  </div>
                </div>
              </div>

              {/* Placement average package */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-accent text-muted-foreground border border-border/40">
                  <Briefcase className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Average package</div>
                  <div className="text-xs font-bold text-foreground mt-0.5">{college.placementStats.averageSalary} LPA</div>
                </div>
              </div>

              <hr className="border-border/60 my-2" />

              {/* Call to Actions */}
              <div className="space-y-2 pt-2">
                <Button className="w-full h-9 text-xs font-bold gap-1.5 shadow-sm">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Request Brochure</span>
                </Button>
                <Button variant="outline" className="w-full h-9 text-xs font-bold border-border/80">
                  <span>Apply Online</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
