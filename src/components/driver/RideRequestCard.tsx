import { useState, useEffect } from "react";
import { MapPin, Clock, DollarSign, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RideRequestCardProps {
  pickup: string;
  dropoff: string;
  distance: string;
  fare: string;
  timeLeft: number;
  onAccept: () => void;
  onDecline: () => void;
}

export function RideRequestCard({
  pickup,
  dropoff,
  distance,
  fare,
  timeLeft: initialTime,
  onAccept,
  onDecline,
}: RideRequestCardProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onDecline();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onDecline]);

  const progress = (timeLeft / initialTime) * 100;

  return (
    <div className="p-6 rounded-2xl glass-strong border-2 border-primary animate-scale-in">
      {/* Timer bar */}
      <div className="h-1 bg-muted rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-bold text-foreground">New Ride Request</h3>
        <div className="flex items-center gap-1 text-warning">
          <Clock className="w-4 h-4" />
          <span className="font-mono font-bold">{timeLeft}s</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-3 h-3 rounded-full bg-success mt-1.5" />
          <div>
            <p className="text-xs text-muted-foreground">Pickup</p>
            <p className="text-foreground font-medium">{pickup}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-destructive mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">Dropoff</p>
            <p className="text-foreground font-medium">{dropoff}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 rounded-xl bg-secondary">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Navigation className="w-4 h-4" />
            <span className="text-xs">Distance</span>
          </div>
          <p className="font-display font-bold text-foreground">{distance}</p>
        </div>
        <div className="p-3 rounded-xl bg-primary/10">
          <div className="flex items-center gap-2 text-primary mb-1">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs">Estimated Fare</span>
          </div>
          <p className="font-display font-bold text-primary">{fare}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onDecline} className="flex-1">
          Decline
        </Button>
        <Button variant="success" onClick={onAccept} className="flex-1">
          Accept Ride
        </Button>
      </div>
    </div>
  );
}
