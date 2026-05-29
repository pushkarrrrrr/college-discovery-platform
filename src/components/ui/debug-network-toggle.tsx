"use client";

import { useEffect, useState } from "react";
import { ShieldAlert, Database, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DebugNetworkToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiFail, setApiFail] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setApiFail(localStorage.getItem("simulate_api_failure") === "true");
  }, []);

  if (!mounted) return null;

  const toggleApiFailure = () => {
    const newVal = !apiFail;
    setApiFail(newVal);
    localStorage.setItem("simulate_api_failure", newVal ? "true" : "false");
    // Reload page to immediately trigger simulated API errors
    window.location.reload();
  };

  const triggerRenderCrash = () => {
    localStorage.setItem("simulate_rendering_crash", "true");
    window.location.reload();
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {/* Expanded Dev Tools Card */}
      {isOpen && (
        <div className="w-64 rounded-2xl border border-border bg-card/95 p-4 pr-6 shadow-xl backdrop-blur-md animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <h4 className="font-extrabold text-xs flex items-center gap-1.5 text-foreground">
              <ShieldAlert className="h-4 w-4 text-amber-500" />
              <span>Dev Resilience Tools</span>
            </h4>
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground bg-accent px-1.5 py-0.5 rounded">
              Mock API
            </span>
          </div>

          <div className="space-y-4 pt-3">
            {/* Toggle 1: API offline */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">Simulate API Offline</span>
                <button
                  onClick={toggleApiFailure}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                    apiFail ? "bg-destructive" : "bg-muted"
                  )}
                  aria-label="Simulate API offline status"
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out",
                      apiFail ? "translate-x-4" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground leading-normal font-medium">
                Throws a connection timeout exception on all subsequent catalog and details requests.
              </p>
            </div>

            {/* Toggle 2: Render Crash */}
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="text-xs font-bold text-foreground">Simulate Render Crash</span>
              <Button
                onClick={triggerRenderCrash}
                size="sm"
                variant="outline"
                className="h-8 text-[10px] font-bold gap-1 w-full border-destructive/20 text-destructive hover:bg-destructive/5 hover:text-destructive cursor-pointer"
              >
                <AlertCircle className="h-3.5 w-3.5" />
                <span>Trigger React Crash</span>
              </Button>
              <p className="text-[10px] text-muted-foreground leading-normal font-medium">
                Crashes the React rendering loop on the listing page to trigger the Next.js Route Error Boundary.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer relative",
          apiFail
            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            : "bg-accent text-accent-foreground border border-border hover:bg-accent/80"
        )}
        title="Toggle Resilience Dev Tools"
        aria-label="Toggle Dev Resilience Panel"
      >
        <Database className="h-5 w-5" />
        {apiFail && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 border border-white"></span>
          </span>
        )}
      </button>
    </div>
  );
}
