"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/error-state";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global Critical Error Boundary caught an exception:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center p-6 bg-background text-foreground font-sans antialiased">
        <div className="w-full max-w-lg animate-in fade-in duration-300">
          <ErrorState
            title="System Critical Error"
            description="A critical framework error prevented the application layout from rendering. Please reload the system."
            onRetry={reset}
          />
        </div>
      </body>
    </html>
  );
}
