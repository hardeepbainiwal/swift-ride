import { MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

interface LocationInputProps {
  type: "pickup" | "dropoff";
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

export function LocationInput({ type, value, onChange, placeholder, className }: LocationInputProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        {type === "pickup" ? (
          <div className="w-3 h-3 rounded-full bg-success animate-pulse-glow" />
        ) : (
          <MapPin className="w-5 h-5 text-destructive" />
        )}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-14 pl-12 pr-12 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-muted transition-colors"
        aria-label="Use current location"
      >
        <Navigation className="w-5 h-5 text-muted-foreground" />
      </button>
    </div>
  );
}
