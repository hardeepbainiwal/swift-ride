import { MapPin, Navigation, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapPlaceholderProps {
  className?: string;
  showRoute?: boolean;
  driverLocation?: { lat: number; lng: number } | null;
}

export function MapPlaceholder({ className, showRoute = false, driverLocation }: MapPlaceholderProps) {
  return (
    <div className={cn("relative rounded-2xl overflow-hidden bg-secondary", className)}>
      {/* Simulated map background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 5}
              x2="100"
              y2={i * 5}
              stroke="currentColor"
              strokeWidth="0.2"
              className="text-border"
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 5}
              y1="0"
              x2={i * 5}
              y2="100"
              stroke="currentColor"
              strokeWidth="0.2"
              className="text-border"
            />
          ))}
          {/* Roads */}
          <path
            d="M0,30 Q30,30 50,50 T100,70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-muted-foreground/50"
          />
          <path
            d="M20,0 Q20,40 50,50 T80,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-muted-foreground/50"
          />
          <path
            d="M0,60 L100,40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground/30"
          />
        </svg>
      </div>

      {/* Route visualization */}
      {showRoute && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-3/4 h-1/2" viewBox="0 0 100 50">
            <path
              d="M10,40 Q30,10 50,25 T90,10"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeDasharray="5,3"
              className="animate-pulse"
            />
            {/* Pickup marker */}
            <circle cx="10" cy="40" r="4" fill="hsl(var(--success))" />
            {/* Dropoff marker */}
            <circle cx="90" cy="10" r="4" fill="hsl(var(--destructive))" />
          </svg>
        </div>
      )}

      {/* Driver marker */}
      {driverLocation && (
        <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 animate-float">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Navigation className="w-5 h-5 text-primary-foreground transform rotate-45" />
          </div>
        </div>
      )}

      {/* Center marker */}
      {!showRoute && !driverLocation && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
          <div className="relative">
            <MapPin className="w-10 h-10 text-primary drop-shadow-lg" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-primary animate-ping" />
          </div>
        </div>
      )}

      {/* Loading overlay */}
      <div className="absolute bottom-4 right-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass text-xs text-muted-foreground">
          <Loader2 className="w-3 h-3 animate-spin" />
          Updating location...
        </div>
      </div>

      {/* Map attribution */}
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground/50">
        Map data simulation
      </div>
    </div>
  );
}
