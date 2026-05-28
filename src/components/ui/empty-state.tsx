import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon = AlertCircle,
  action,
  className
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center border border-dashed border-border rounded-2xl bg-card/25 backdrop-blur-sm shadow-sm animate-in fade-in duration-300",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground border border-border/80 shadow-inner">
        <Icon className="h-6 w-6 stroke-[1.5] text-muted-foreground" />
      </div>
      
      <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground">
        {title}
      </h3>
      
      <p className="mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
      
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}
