import { College } from "@/types";
import { RatingBadge } from "@/components/ui/rating-badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Building,
  Briefcase,
  Users,
  CheckCircle,
  Sparkles,
  Award,
  BookOpen
} from "lucide-react";

interface SectionProps {
  college: College;
}

// ----------------------------------------------------
// 1. OVERVIEW SECTION
// ----------------------------------------------------
export function OverviewSection({ college }: SectionProps) {
  return (
    <div className="space-y-6">
      {/* About Description */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
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
              <Calendar className="h-5 w-5" />
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
              <Building className="h-5 w-5" />
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
              <Award className="h-5 w-5" />
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
          <Building className="h-5 w-5 text-primary" />
          <span>Campus Infrastructure</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {college.infrastructure.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. COURSES SECTION
// ----------------------------------------------------
export function CoursesSection({ college }: SectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <span>Programs Offered & Fee Structure</span>
        </h3>
        <p className="text-xs text-muted-foreground">
          Eligibility criteria and annual course fees for the undergraduate and postgraduate programs.
        </p>
      </div>

      {/* Courses List Grid/Table */}
      <div className="border border-border/80 rounded-2xl overflow-hidden bg-card/30 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-accent/40 border-b border-border/80 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                <th className="p-4">Course Name</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Annual Fees</th>
                <th className="p-4">Eligibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs font-semibold text-foreground">
              {college.courses.map((course) => (
                <tr key={course.id} className="hover:bg-accent/25 transition-colors">
                  <td className="p-4 font-bold text-sm text-primary">{course.name}</td>
                  <td className="p-4 text-muted-foreground">{course.duration}</td>
                  <td className="p-4 font-extrabold">₹{course.feesPerYear.toLocaleString("en-IN")} / yr</td>
                  <td className="p-4 text-muted-foreground font-medium">{course.eligibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. PLACEMENTS SECTION
// ----------------------------------------------------
export function PlacementsSection({ college }: SectionProps) {
  const { placementStats } = college;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
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
          <div className="text-[10px] text-indigo-600 font-bold mt-1 bg-indigo-500/10 inline-block px-2 py-0.5 rounded">International Placements</div>
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
        <div className="flex flex-wrap gap-2">
          {placementStats.topRecruiters.map((recruiter, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-lg border border-border/80 bg-accent/20 text-xs font-bold text-muted-foreground shadow-xs"
            >
              {recruiter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 4. REVIEWS SECTION
// ----------------------------------------------------
export function ReviewsSection({ college }: SectionProps) {
  // Compute average category scores based on reviews list
  const categoryAverages = {
    academics: 0,
    infrastructure: 0,
    placements: 0,
    campusLife: 0
  };

  const count = college.reviews.length;
  if (count > 0) {
    college.reviews.forEach((r) => {
      categoryAverages.academics += r.categoryRatings.academics;
      categoryAverages.infrastructure += r.categoryRatings.infrastructure;
      categoryAverages.placements += r.categoryRatings.placements;
      categoryAverages.campusLife += r.categoryRatings.campusLife;
    });
    categoryAverages.academics = Number((categoryAverages.academics / count).toFixed(1));
    categoryAverages.infrastructure = Number((categoryAverages.infrastructure / count).toFixed(1));
    categoryAverages.placements = Number((categoryAverages.placements / count).toFixed(1));
    categoryAverages.campusLife = Number((categoryAverages.campusLife / count).toFixed(1));
  } else {
    // Fallbacks if no reviews exist
    categoryAverages.academics = college.rating;
    categoryAverages.infrastructure = college.rating;
    categoryAverages.placements = college.rating;
    categoryAverages.campusLife = college.rating;
  }

  const ratingsGrid = [
    { label: "Academics", score: categoryAverages.academics },
    { label: "Infrastructure", score: categoryAverages.infrastructure },
    { label: "Placements", score: categoryAverages.placements },
    { label: "Campus Life", score: categoryAverages.campusLife }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Student Testimonials</span>
          </h3>
          <p className="text-xs text-muted-foreground">
            Verified ratings and detailed feedback from alumni and enrolled students.
          </p>
        </div>
        
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <RatingBadge rating={college.rating} size="lg" showText reviewsCount={college.reviewsCount} />
        </div>
      </div>

      {/* Category Wise ratings bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl border border-border/60 bg-accent/15">
        {ratingsGrid.map((cat, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-foreground">
              <span>{cat.label}</span>
              <span className="text-primary">{cat.score.toFixed(1)} / 5.0</span>
            </div>
            {/* Simple progress bar */}
            <div className="h-2 w-full rounded-full bg-accent border border-border/40 overflow-hidden">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${(cat.score / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Reviewer Cards List */}
      <div className="space-y-4">
        {college.reviews.map((review) => (
          <div key={review.id} className="rounded-2xl border border-border/80 bg-card p-5 space-y-3 shadow-xs">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h4 className="font-extrabold text-sm text-foreground leading-none">{review.userName}</h4>
                <span className="text-[10px] text-muted-foreground mt-1.5 block font-medium">Reviewed on {review.date}</span>
              </div>
              <RatingBadge rating={review.rating} size="xs" />
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              &quot;{review.comment}&quot;
            </p>

            {/* Individual Category rating score chips */}
            <div className="flex flex-wrap gap-2 pt-1.5 border-t border-border/50">
              <span className="text-[9px] font-bold text-muted-foreground bg-accent/40 px-2 py-0.5 rounded">Academics: {review.categoryRatings.academics}</span>
              <span className="text-[9px] font-bold text-muted-foreground bg-accent/40 px-2 py-0.5 rounded">Infrastructure: {review.categoryRatings.infrastructure}</span>
              <span className="text-[9px] font-bold text-muted-foreground bg-accent/40 px-2 py-0.5 rounded">Placements: {review.categoryRatings.placements}</span>
              <span className="text-[9px] font-bold text-muted-foreground bg-accent/40 px-2 py-0.5 rounded">Campus Life: {review.categoryRatings.campusLife}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
