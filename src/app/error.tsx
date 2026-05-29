"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/error-state";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to console or error tracker in production
    console.error("Route Error Boundary caught an exception:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center py-16 animate-in fade-in duration-300">
      <ErrorState
        title="Application Error"
        description={
          error.message ||
          "An unexpected error occurred during rendering. Please retry or contact support if the problem persists."
        }
        onRetry={reset}
      />
    </div>
  );
}
