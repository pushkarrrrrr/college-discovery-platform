import { MOCK_COLLEGES } from "@/data/colleges";
import { College, FilterParams } from "@/types";

// Simulate a network delay (e.g. 500ms) to trigger loading skeletons
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface CollegeResponse {
  colleges: College[];
  total: number;
  hasMore: boolean;
}

export const CollegeService = {
  /**
   * Fetches a paginated, filtered, and sorted list of colleges.
   */
  async getColleges(filters: Partial<FilterParams> = {}): Promise<CollegeResponse> {
    if (typeof window !== "undefined" && window.localStorage.getItem("simulate_api_failure") === "true") {
      await delay(200);
      throw new Error("Simulated Connection Error: The remote API server did not respond within the 5000ms timeout limit.");
    }
    await delay(500); // 500ms synthetic network latency

    const search = (filters.search || "").toLowerCase().trim();
    const state = filters.state || "";
    const city = filters.city || "";
    const maxFees = filters.maxFees || Infinity;
    const minRating = filters.minRating || 0;
    const type = filters.type || "All";
    const sortBy = filters.sortBy || "rating";
    const page = filters.page || 1;
    const limit = filters.limit || 6;

    let filtered = [...MOCK_COLLEGES];

    // 1. Text Search Filter (Matches name, description, city, state)
    if (search) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.description.toLowerCase().includes(search) ||
          c.location.city.toLowerCase().includes(search) ||
          c.location.state.toLowerCase().includes(search)
      );
    }

    // 2. State & City Filter
    if (state) {
      filtered = filtered.filter((c) => c.location.state === state);
    }
    if (city) {
      filtered = filtered.filter((c) => c.location.city === city);
    }

    // 3. Fees Filter (min fees per year matches max limit)
    if (maxFees && maxFees !== Infinity) {
      filtered = filtered.filter((c) => c.feesRange.min <= maxFees);
    }

    // 4. Rating Filter
    if (minRating > 0) {
      filtered = filtered.filter((c) => c.rating >= minRating);
    }

    // 5. College Type (Public / Private)
    if (type !== "All") {
      filtered = filtered.filter((c) => c.type === type);
    }

    // 6. Sorting
    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "fees_low") {
      filtered.sort((a, b) => a.feesRange.min - b.feesRange.min);
    } else if (sortBy === "fees_high") {
      filtered.sort((a, b) => b.feesRange.min - a.feesRange.min);
    } else if (sortBy === "placement") {
      filtered.sort((a, b) => b.placementStats.averageSalary - a.placementStats.averageSalary);
    }

    // 7. Pagination
    const startIndex = (page - 1) * limit;
    const paginatedColleges = filtered.slice(startIndex, startIndex + limit);
    const hasMore = startIndex + limit < filtered.length;

    return {
      colleges: paginatedColleges,
      total: filtered.length,
      hasMore,
    };
  },

  /**
   * Fetches details of a single college by its slug/id.
   */
  async getCollegeById(id: string): Promise<College | null> {
    if (typeof window !== "undefined" && window.localStorage.getItem("simulate_api_failure") === "true") {
      await delay(200);
      throw new Error("Simulated Connection Error: The remote API server did not respond within the 5000ms timeout limit.");
    }
    await delay(300); // 300ms synthetic network latency
    const college = MOCK_COLLEGES.find((c) => c.id === id);
    return college || null;
  },

  /**
   * Fetches metadata about available filter locations.
   */
  async getLocations(): Promise<{ cities: string[]; states: string[] }> {
    await delay(100);
    const states = Array.from(new Set(MOCK_COLLEGES.map((c) => c.location.state))).sort();
    const cities = Array.from(new Set(MOCK_COLLEGES.map((c) => c.location.city))).sort();

    return { cities, states };
  },
};
