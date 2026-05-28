import { School } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex items-center justify-center gap-2 md:order-1">
          <School className="h-5 w-5 text-primary stroke-[1.5]" />
          <span className="text-sm font-semibold text-foreground">EduDiscover</span>
          <span className="text-xs text-muted-foreground">| College Discovery System</span>
        </div>
        
        <div className="mt-8 md:order-2 md:mt-0">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} EduDiscover Inc. All rights reserved. Created as an AI software engineering intern assignment.
          </p>
        </div>
      </div>
    </footer>
  );
}
