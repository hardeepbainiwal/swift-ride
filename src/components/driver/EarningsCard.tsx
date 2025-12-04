import { TrendingUp, Clock, Car } from "lucide-react";

interface EarningsCardProps {
  todayEarnings: string;
  totalRides: number;
  onlineHours: string;
}

export function EarningsCard({ todayEarnings, totalRides, onlineHours }: EarningsCardProps) {
  return (
    <div className="p-6 rounded-2xl glass">
      <h3 className="font-display font-semibold text-foreground mb-4">Today's Summary</h3>
      
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
        <p className="font-display text-4xl font-bold text-gradient">{todayEarnings}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-xl bg-secondary">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Car className="w-4 h-4" />
            <span className="text-xs">Rides</span>
          </div>
          <p className="font-display font-bold text-foreground">{totalRides}</p>
        </div>
        <div className="p-3 rounded-xl bg-secondary">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs">Online</span>
          </div>
          <p className="font-display font-bold text-foreground">{onlineHours}</p>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-success/10 flex items-center gap-3">
        <TrendingUp className="w-5 h-5 text-success" />
        <p className="text-sm text-success">+12% from last week</p>
      </div>
    </div>
  );
}
