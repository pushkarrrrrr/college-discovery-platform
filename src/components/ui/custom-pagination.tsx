import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
  className
}: CustomPaginationProps) {
  if (totalPages <= 1) return null;

  // Helper to generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    
    // Always include page 1
    pages.push(1);
    
    // For small number of pages, show all
    if (totalPages <= 5) {
      for (let i = 2; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate start and end indices around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      if (start > 2) {
        pages.push("ellipsis");
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push("ellipsis");
      }
    }
    
    // Always include the last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      className={cn("flex items-center justify-between border-t border-border/80 px-4 py-3 sm:px-6 mt-8", className)}
      aria-label="Pagination Navigation"
    >
      {/* Mobile view: Simple Prev / Next */}
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="text-xs h-9 px-3 gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>
        <span className="text-xs font-semibold self-center text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="text-xs h-9 px-3 gap-1"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Desktop view: Detailed page index list */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-muted-foreground">
            Showing page <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
            <span className="font-semibold text-foreground">{totalPages}</span>
          </p>
        </div>
        
        <div>
          <ul className="flex items-center gap-1.5 list-none">
            {/* Prev arrow */}
            <li>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="h-8 w-8"
                aria-label="Previous Page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </li>

            {/* Page indices */}
            {pages.map((page, index) => {
              if (page === "ellipsis") {
                return (
                  <li key={`ellipsis-${index}`} className="flex h-8 w-8 items-center justify-center text-muted-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </li>
                );
              }

              const isCurrent = page === currentPage;

              return (
                <li key={page}>
                  <Button
                    variant={isCurrent ? "default" : "outline"}
                    size="icon"
                    onClick={() => onPageChange(page)}
                    className={cn(
                      "h-8 w-8 text-xs font-semibold",
                      !isCurrent && "hover:bg-accent/60 hover:text-accent-foreground border-border/70"
                    )}
                    aria-label={`Go to page ${page}`}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {page}
                  </Button>
                </li>
              );
            })}

            {/* Next arrow */}
            <li>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="h-8 w-8"
                aria-label="Next Page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
