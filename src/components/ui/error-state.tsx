import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Connection Error",
  description = "We encountered a problem retrieving the college directory details. Please check your internet connection and try again.",
  onRetry,
  className
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center border border-destructive/20 rounded-2xl bg-destructive/5 shadow-sm max-w-lg mx-auto",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive border border-destructive/25 mb-4 animate-bounce">
        <AlertTriangle className="h-5 w-5" />
      </div>
      
      <h3 className="text-lg font-bold tracking-tight text-foreground">
        {title}
      </h3>
      
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm" className="mt-6 gap-1.5 border-destructive/30 hover:bg-destructive/10 hover:text-destructive transition-colors">
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Retry Request</span>
        </Button>
      )}
    </div>
  );
}
