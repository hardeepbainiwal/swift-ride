import { Car, Users, Zap, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface RideType {
  id: string;
  name: string;
  icon: typeof Car;
  description: string;
  multiplier: number;
  eta: string;
}

const rideTypes: RideType[] = [
  { id: "economy", name: "Economy", icon: Car, description: "Affordable rides", multiplier: 1, eta: "3 min" },
  { id: "comfort", name: "Comfort", icon: Users, description: "Extra legroom", multiplier: 1.3, eta: "5 min" },
  { id: "express", name: "Express", icon: Zap, description: "Fastest pickup", multiplier: 1.5, eta: "2 min" },
  { id: "premium", name: "Premium", icon: Crown, description: "Luxury vehicles", multiplier: 2, eta: "7 min" },
];

interface RideTypeSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
  baseFare: number;
}

export function RideTypeSelector({ selected, onSelect, baseFare }: RideTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-display font-semibold text-foreground">Choose your ride</h3>
      <div className="grid grid-cols-2 gap-3">
        {rideTypes.map((type) => {
          const isSelected = selected === type.id;
          const fare = (baseFare * type.multiplier).toFixed(2);
          
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border bg-secondary hover:border-primary/50"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <type.icon className={cn("w-6 h-6", isSelected ? "text-primary" : "text-muted-foreground")} />
                <span className="text-xs text-muted-foreground">{type.eta}</span>
              </div>
              <h4 className="font-semibold text-foreground text-sm">{type.name}</h4>
              <p className="text-xs text-muted-foreground mb-2">{type.description}</p>
              <p className="font-display font-bold text-primary">${fare}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
