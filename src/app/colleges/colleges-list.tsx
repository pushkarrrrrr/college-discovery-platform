"use client";

import { useEffect, useState, useTransition, useCallback, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { College, FilterParams } from "@/types";
import { CollegeService } from "@/services/api";
import { useDebounce } from "@/hooks/use-debounce";

// Reusable UI components from Phase 2
import { CollegeCard } from "@/components/college/college-card";
import { CollegeCardSkeleton } from "@/components/college/college-card-skeleton";
import { SearchBar } from "@/components/filters/search-bar";
import { SortDropdown } from "@/components/filters/sort-dropdown";
import { FilterSidebar } from "@/components/filters/filter-sidebar";
import { SectionHeader } from "@/components/ui/section-header";
import { CustomPagination } from "@/components/ui/custom-pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Button } from "@/components/ui/button";

// Primitives for Mobile Drawer Filter
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { SlidersHorizontal, Search, RotateCcw, X } from "lucide-react";

export function CollegesList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Simulate rendering crash for testing Next.js Route Error Boundaries
  if (typeof window !== "undefined" && window.localStorage.getItem("simulate_rendering_crash") === "true") {
    window.localStorage.removeItem("simulate_rendering_crash");
    throw new Error("Simulated React Rendering Crash: A fatal runtime exception occurred while rendering the listing grid.");
  }

  // 1. Read parameters directly from URL (Single Source of Truth)
  const search = searchParams.get("search") || "";
  const state = searchParams.get("state") || "";
  const city = searchParams.get("city") || "";
  const maxFees = searchParams.get("maxFees") ? Number(searchParams.get("maxFees")) : Infinity;
  const minRating = searchParams.get("minRating") ? Number(searchParams.get("minRating")) : 0;
  const type = (searchParams.get("type") as "All" | "Private" | "Public") || "All";
  const sortBy = (searchParams.get("sortBy") as "rating" | "fees_low" | "fees_high" | "placement") || "rating";
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const limit = 6;

  // Derive filters object to pass down to presentational components (memoized to prevent child re-renders on keystrokes)
  const filters = useMemo((): Partial<FilterParams> => ({
    state,
    city,
    maxFees,
    minRating,
    type,
    sortBy,
    page,
    limit,
  }), [state, city, maxFees, minRating, type, sortBy, page]);

  // Controlled UI search state (local state for responsive typing)
  const [searchText, setSearchText] = useState(search);
  const debouncedSearchText = useDebounce(searchText, 300);

  // Query responses states
  const [colleges, setColleges] = useState<College[]>([]);
  const [totalColleges, setTotalColleges] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Location list data
  const [locations, setLocations] = useState<{ cities: string[]; states: string[] }>({
    cities: [],
    states: [],
  });

  // Mobile drawer control
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // 2. Fetch locations on mount
  useEffect(() => {
    async function fetchLocations() {
      try {
        const loc = await CollegeService.getLocations();
        setLocations(loc);
      } catch (err) {
        console.error("Failed to load filter locations", err);
      }
    }
    fetchLocations();
  }, []);

  // Helper to construct a URL search parameters object from current filters + updates
  const getUpdatedUrlParams = useCallback((updated: Partial<FilterParams>, currentSearch: string) => {
    const params = new URLSearchParams();
    
    // 1. Search Query
    if (currentSearch) params.set("search", currentSearch);
    
    // 2. State & City
    const finalState = updated.state !== undefined ? updated.state : state;
    const finalCity = updated.city !== undefined ? updated.city : city;
    if (finalState) params.set("state", finalState);
    if (finalCity) params.set("city", finalCity);

    // 3. Max Fees
    const finalMaxFees = updated.maxFees !== undefined ? updated.maxFees : maxFees;
    if (finalMaxFees && finalMaxFees !== Infinity) {
      params.set("maxFees", finalMaxFees.toString());
    }

    // 4. Min Rating
    const finalMinRating = updated.minRating !== undefined ? updated.minRating : minRating;
    if (finalMinRating && finalMinRating > 0) {
      params.set("minRating", finalMinRating.toString());
    }

    // 5. College Type
    const finalType = updated.type !== undefined ? updated.type : type;
    if (finalType && finalType !== "All") {
      params.set("type", finalType);
    }

    // 6. Sort By
    const finalSortBy = updated.sortBy !== undefined ? updated.sortBy : sortBy;
    if (finalSortBy && finalSortBy !== "rating") {
      params.set("sortBy", finalSortBy);
    }

    // 7. Page
    let finalPage = 1;
    if (updated.page !== undefined) {
      finalPage = updated.page;
    } else if (
      updated.state === undefined &&
      updated.city === undefined &&
      updated.maxFees === undefined &&
      updated.minRating === undefined &&
      updated.type === undefined &&
      updated.sortBy === undefined
    ) {
      finalPage = page;
    }
    
    if (finalPage > 1) {
      params.set("page", finalPage.toString());
    }

    return params.toString();
  }, [state, city, maxFees, minRating, type, sortBy, page]);

  // 3. Update handlers writing to the URL
  const handleFilterChange = useCallback((updated: Partial<FilterParams>) => {
    const queryString = getUpdatedUrlParams(updated, debouncedSearchText);
    startTransition(() => {
      router.replace(`${pathname}?${queryString}`);
    });
  }, [getUpdatedUrlParams, debouncedSearchText, pathname, router]);

  const handleClearFilters = useCallback(() => {
    setSearchText("");
    startTransition(() => {
      router.replace(pathname);
    });
  }, [pathname, router]);

  const handlePageChange = useCallback((newPage: number) => {
    const queryString = getUpdatedUrlParams({ page: newPage }, debouncedSearchText);
    startTransition(() => {
      router.replace(`${pathname}?${queryString}`);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [getUpdatedUrlParams, debouncedSearchText, pathname, router]);

  // 4. Sync effects
  // Sync debounced search input to URL query parameters
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (debouncedSearchText !== urlSearch) {
      const queryString = getUpdatedUrlParams({ page: 1 }, debouncedSearchText);
      startTransition(() => {
        router.replace(`${pathname}?${queryString}`);
      });
    }
  }, [debouncedSearchText, searchParams, pathname, router, getUpdatedUrlParams]);

  // Sync URL search parameters back to search input state (e.g. browser back/forward buttons)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchText(search);
  }, [search]);

  // 5. Fetch colleges data on filter parameter changes
  const fetchCollegesData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await CollegeService.getColleges({
        state,
        city,
        maxFees,
        minRating,
        type,
        sortBy,
        page,
        limit,
        search,
      });
      
      setColleges(response.colleges);
      setTotalColleges(response.total);
    } catch (err) {
      console.error("Failed to load colleges data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [search, state, city, maxFees, minRating, type, sortBy, page]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCollegesData();
  }, [fetchCollegesData]);

  const totalPages = Math.ceil(totalColleges / limit);

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Page Title Section */}
      <SectionHeader
        title="Find Top Colleges"
        description="Search, filter, and shortlist the best engineering and management universities in India."
      />

      {/* Main Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <SearchBar value={searchText} onChange={setSearchText} className="flex-1" />
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {/* Mobile Filter Trigger Button */}
          <Drawer open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" className="lg:hidden h-10 gap-1.5 text-xs font-bold font-sans" aria-label="Open search filters" aria-expanded={mobileDrawerOpen}>
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                <span>Filters</span>
                {(filters.state ||
                  filters.city ||
                  filters.type !== "All" ||
                  filters.minRating !== 0 ||
                  (filters.maxFees && filters.maxFees !== Infinity)) && (
                  <span className="flex h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh] px-6 pb-6">
              <DrawerHeader className="px-0">
                <DrawerTitle className="text-left font-bold flex justify-between items-center">
                  <span>Search Filters</span>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Close search filters">
                      <X className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </DrawerClose>
                </DrawerTitle>
              </DrawerHeader>
              <div className="overflow-y-auto pr-1">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  locations={locations}
                />
                <DrawerClose asChild>
                  <Button className="w-full mt-6 font-bold" onClick={() => setMobileDrawerOpen(false)}>
                    Apply Filters
                  </Button>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>

          <SortDropdown value={filters.sortBy || "rating"} onChange={(sortBy) => handleFilterChange({ sortBy })} />
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 border border-border/80 rounded-2xl p-5 bg-card/60 backdrop-blur-xs h-fit shadow-xs sticky top-24">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            locations={locations}
          />
        </aside>

        {/* Listings Display Grid */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Transition Pending indicator */}
          {isPending && (
            <div className="text-xs text-primary font-bold animate-pulse">Syncing url parameters...</div>
          )}

          {error ? (
            <ErrorState onRetry={fetchCollegesData} />
          ) : loading ? (
            /* Loading skeletons */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CollegeCardSkeleton key={i} />
              ))}
            </div>
          ) : colleges.length === 0 ? (
            /* Empty state results */
            <EmptyState
              title="No colleges match your search"
              description="Try adjusting your fee sliders, clearing active locations, or search queries to broaden your exploration."
              icon={Search}
              action={
                <Button onClick={handleClearFilters} className="gap-1.5 font-bold shadow-sm">
                  <RotateCcw className="h-4 w-4" />
                  <span>Clear All Filters</span>
                </Button>
              }
            />
          ) : (
            /* List display */
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {colleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>

              {/* Pagination controls */}
              <CustomPagination
                currentPage={filters.page || 1}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
