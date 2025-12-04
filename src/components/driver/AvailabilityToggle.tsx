import { Power } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvailabilityToggleProps {
  isOnline: boolean;
  onToggle: () => void;
}

export function AvailabilityToggle({ isOnline, onToggle }: AvailabilityToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "relative w-full p-6 rounded-2xl transition-all duration-500",
        isOnline
          ? "bg-success/10 border-2 border-success"
          : "bg-secondary border-2 border-border hover:border-muted-foreground"
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">
            {isOnline ? "You're online" : "You're offline"}
          </p>
          <h3 className={cn(
            "font-display text-2xl font-bold",
            isOnline ? "text-success" : "text-foreground"
          )}>
            {isOnline ? "Accepting Rides" : "Go Online"}
          </h3>
        </div>
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500",
          isOnline
            ? "bg-success shadow-lg shadow-success/30 animate-pulse-glow"
            : "bg-muted"
        )}>
          <Power className={cn(
            "w-8 h-8 transition-colors",
            isOnline ? "text-success-foreground" : "text-muted-foreground"
          )} />
        </div>
      </div>
      {isOnline && (
        <div className="mt-4 pt-4 border-t border-success/20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-ping" />
            <span className="text-sm text-success">Live - Searching for riders nearby</span>
          </div>
        </div>
      )}
    </button>
  );
}
