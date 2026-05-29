"use client";

import { College } from "@/types";
import { RatingBadge } from "@/components/ui/rating-badge";
import { Users } from "lucide-react";

interface SectionProps {
  college: College;
}

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
            <Users className="h-5 w-5 text-primary" aria-hidden="true" />
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
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={5}
              aria-valuenow={cat.score}
              aria-label={`${cat.label} average rating`}
              className="h-2 w-full rounded-full bg-accent border border-border/40 overflow-hidden"
            >
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${(cat.score / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Reviewer Cards List */}
      <ul className="space-y-4 list-none" aria-label="Student review list">
        {college.reviews.map((review) => (
          <li key={review.id} className="rounded-2xl border border-border/80 bg-card p-5 space-y-3 shadow-xs">
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
          </li>
        ))}
      </ul>
    </div>
  );
}
