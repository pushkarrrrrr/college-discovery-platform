"use client";

import { useEffect, useState, useTransition } from "react";
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

  // 1. Initial State from URL params
  const initialSearch = searchParams.get("search") || "";
  const initialState = searchParams.get("state") || "";
  const initialCity = searchParams.get("city") || "";
  const initialMaxFees = searchParams.get("maxFees") ? Number(searchParams.get("maxFees")) : Infinity;
  const initialMinRating = searchParams.get("minRating") ? Number(searchParams.get("minRating")) : 0;
  const initialType = (searchParams.get("type") as "All" | "Private" | "Public") || "All";
  const initialSortBy = (searchParams.get("sortBy") as "rating" | "fees_low" | "fees_high" | "placement") || "rating";
  const initialPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // Controlled UI search state
  const [searchText, setSearchText] = useState(initialSearch);
  const debouncedSearchText = useDebounce(searchText, 300);

  // Filter state
  const [filters, setFilters] = useState<Partial<FilterParams>>({
    state: initialState,
    city: initialCity,
    maxFees: initialMaxFees,
    minRating: initialMinRating,
    type: initialType,
    sortBy: initialSortBy,
    page: initialPage,
    limit: 6,
  });

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

  // 3. Synchronize filter changes to URL search parameters
  const updateUrlParams = (updatedFilters: Partial<FilterParams>, searchQuery: string) => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set("search", searchQuery);
    if (updatedFilters.state) params.set("state", updatedFilters.state);
    if (updatedFilters.city) params.set("city", updatedFilters.city);
    if (updatedFilters.maxFees && updatedFilters.maxFees !== Infinity) {
      params.set("maxFees", updatedFilters.maxFees.toString());
    }
    if (updatedFilters.minRating && updatedFilters.minRating > 0) {
      params.set("minRating", updatedFilters.minRating.toString());
    }
    if (updatedFilters.type && updatedFilters.type !== "All") {
      params.set("type", updatedFilters.type);
    }
    if (updatedFilters.sortBy && updatedFilters.sortBy !== "rating") {
      params.set("sortBy", updatedFilters.sortBy);
    }
    if (updatedFilters.page && updatedFilters.page > 1) {
      params.set("page", updatedFilters.page.toString());
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  // 4. Fetch colleges when filters or search change
  const fetchCollegesData = async (currentFilters: Partial<FilterParams>, currentSearch: string) => {
    setLoading(true);
    setError(false);
    try {
      const response = await CollegeService.getColleges({
        ...currentFilters,
        search: currentSearch,
      } as FilterParams);
      
      setColleges(response.colleges);
      setTotalColleges(response.total);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Trigger data load & URL sync on changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCollegesData(filters, debouncedSearchText);
    updateUrlParams(filters, debouncedSearchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedSearchText,
    filters.state,
    filters.city,
    filters.maxFees,
    filters.minRating,
    filters.type,
    filters.sortBy,
    filters.page,
  ]);

  // Sync URL params back to state on browser back/forward navigation
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const state = searchParams.get("state") || "";
    const city = searchParams.get("city") || "";
    const maxFees = searchParams.get("maxFees") ? Number(searchParams.get("maxFees")) : Infinity;
    const minRating = searchParams.get("minRating") ? Number(searchParams.get("minRating")) : 0;
    const type = (searchParams.get("type") as "All" | "Private" | "Public") || "All";
    const sortBy = (searchParams.get("sortBy") as "rating" | "fees_low" | "fees_high" | "placement") || "rating";
    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

    if (searchText !== search) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchText(search);
    }

    setFilters((prev) => {
      if (
        prev.state === state &&
        prev.city === city &&
        prev.maxFees === maxFees &&
        prev.minRating === minRating &&
        prev.type === type &&
        prev.sortBy === sortBy &&
        prev.page === page
      ) {
        return prev;
      }
      return {
        ...prev,
        state,
        city,
        maxFees,
        minRating,
        type,
        sortBy,
        page,
      };
    });
  }, [searchParams, searchText]);

  // Helper change functions
  const handleFilterChange = (updated: Partial<FilterParams>) => {
    setFilters((prev) => ({
      ...prev,
      ...updated,
      page: 1, // Reset to first page when changing filters
    }));
  };

  const handleClearFilters = () => {
    setSearchText("");
    setFilters({
      state: "",
      city: "",
      maxFees: Infinity,
      minRating: 0,
      type: "All",
      sortBy: "rating",
      page: 1,
      limit: 6,
    });
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    // Smooth scroll to top of page on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(totalColleges / (filters.limit || 6));

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
              <Button variant="outline" className="lg:hidden h-10 gap-1.5 text-xs font-bold font-sans">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
                {(filters.state ||
                  filters.city ||
                  filters.type !== "All" ||
                  filters.minRating !== 0 ||
                  (filters.maxFees && filters.maxFees !== Infinity)) && (
                  <span className="flex h-2.5 w-2.5 rounded-full bg-primary" />
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh] px-6 pb-6">
              <DrawerHeader className="px-0">
                <DrawerTitle className="text-left font-bold flex justify-between items-center">
                  <span>Search Filters</span>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
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
            <ErrorState onRetry={() => fetchCollegesData(filters, debouncedSearchText)} />
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
