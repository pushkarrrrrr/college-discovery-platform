export interface Course {
  id: string;
  name: string;
  duration: string;
  feesPerYear: number;
  eligibility: string;
}

export interface PlacementStats {
  averageSalary: number; // in LPA (Lakhs Per Annum) e.g., 8.5
  highestSalary: number; // in LPA
  placementRate: number; // e.g. 92 (for 92%)
  topRecruiters: string[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  categoryRatings: {
    academics: number;
    infrastructure: number;
    placements: number;
    campusLife: number;
  };
}

export interface College {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage: string;
  featuredImage: string;
  location: {
    city: string;
    state: string;
  };
  established: number;
  type: "Private" | "Public";
  rating: number;
  reviewsCount: number;
  feesRange: {
    min: number; // per year
    max: number; // per year
  };
  courses: Course[];
  placementStats: PlacementStats;
  reviews: Review[];
  ranking: {
    national: number;
    engineering?: number;
    management?: number;
  };
  infrastructure: string[];
}

export interface FilterParams {
  search: string;
  state: string;
  city: string;
  maxFees: number;
  minRating: number;
  type: "All" | "Private" | "Public";
  sortBy: "rating" | "fees_low" | "fees_high" | "placement";
  page: number;
  limit: number;
}
