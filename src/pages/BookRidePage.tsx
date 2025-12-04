import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { LocationInput } from "@/components/booking/LocationInput";
import { RideTypeSelector } from "@/components/booking/RideTypeSelector";
import { MapPlaceholder } from "@/components/booking/MapPlaceholder";
import { ArrowRight, Clock, Shield, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function BookRidePage() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [selectedRide, setSelectedRide] = useState("economy");
  const [isSearching, setIsSearching] = useState(false);
  const [driverFound, setDriverFound] = useState(false);

  const baseFare = 12.50;

  const handleBookRide = () => {
    if (!pickup || !dropoff) {
      toast({
        title: "Missing Information",
        description: "Please enter both pickup and drop-off locations.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate driver search
    setTimeout(() => {
      setIsSearching(false);
      setDriverFound(true);
      toast({
        title: "Driver Found!",
        description: "Alex K. is on the way. ETA: 3 minutes.",
      });
    }, 3000);
  };

  return (
    <Layout>
      <section className="min-h-[calc(100vh-5rem)] py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 h-full">
            {/* Booking Form */}
            <div className="order-2 lg:order-1">
              <div className="glass-strong rounded-2xl p-6 md:p-8 h-full">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Book Your Ride
                </h1>
                <p className="text-muted-foreground mb-8">
                  Enter your locations and choose your ride type
                </p>

                {/* Location Inputs */}
                <div className="space-y-4 mb-8">
                  <div className="relative">
                    <LocationInput
                      type="pickup"
                      value={pickup}
                      onChange={setPickup}
                      placeholder="Enter pickup location"
                    />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-border" />
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
                    </div>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <LocationInput
                    type="dropoff"
                    value={dropoff}
                    onChange={setDropoff}
                    placeholder="Enter drop-off location"
                  />
                </div>

                {/* Ride Type Selector */}
                <div className="mb-8">
                  <RideTypeSelector
                    selected={selectedRide}
                    onSelect={setSelectedRide}
                    baseFare={baseFare}
                  />
                </div>

                {/* Trip Info */}
                {pickup && dropoff && (
                  <div className="p-4 rounded-xl bg-secondary mb-6 animate-fade-in">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Estimated Time</span>
                      </div>
                      <span className="font-display font-semibold text-foreground">~15 min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-success" />
                        <span className="text-sm text-muted-foreground">Safety Features</span>
                      </div>
                      <span className="text-sm text-success">Active</span>
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <Button
                  variant="hero"
                  size="xl"
                  className="w-full"
                  onClick={handleBookRide}
                  disabled={isSearching || driverFound}
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Finding Driver...
                    </>
                  ) : driverFound ? (
                    "Driver On The Way!"
                  ) : (
                    <>
                      Confirm Booking
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>

                {/* Safety Note */}
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Your safety is our priority. All drivers are verified and trips are monitored.
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="order-1 lg:order-2 h-[300px] lg:h-auto">
              <MapPlaceholder
                className="h-full min-h-[300px] lg:min-h-[600px]"
                showRoute={pickup.length > 0 && dropoff.length > 0}
                driverLocation={driverFound ? { lat: 0, lng: 0 } : null}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
