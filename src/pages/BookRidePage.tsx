import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { LocationInput } from "@/components/booking/LocationInput";
import { RideTypeSelector } from "@/components/booking/RideTypeSelector";
import { MapboxMap } from "@/components/booking/MapboxMap";
import { ArrowRight, Clock, Shield, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useGeocoding } from "@/hooks/useGeocoding";
import { useDriverSimulation } from "@/hooks/useDriverSimulation";

interface Location {
  lat: number;
  lng: number;
}

export default function BookRidePage() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [selectedRide, setSelectedRide] = useState("economy");
  const [isSearching, setIsSearching] = useState(false);
  const [driverFound, setDriverFound] = useState(false);
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
  const [eta, setEta] = useState<number | null>(null);

  const { geocode, isLoading: isGeocoding } = useGeocoding();
  const { driverLocation, phase } = useDriverSimulation({
    pickupLocation,
    dropoffLocation,
    isActive: driverFound,
  });

  const baseFare = 12.50;

  // Geocode pickup address
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (pickup.length > 3) {
        const result = await geocode(pickup);
        if (result) {
          setPickupLocation(result.location);
        }
      } else {
        setPickupLocation(null);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [pickup, geocode]);

  // Geocode dropoff address
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (dropoff.length > 3) {
        const result = await geocode(dropoff);
        if (result) {
          setDropoffLocation(result.location);
        }
      } else {
        setDropoffLocation(null);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [dropoff, geocode]);

  // Handle trip completion
  useEffect(() => {
    if (phase === 'completed') {
      toast({
        title: "Trip Completed!",
        description: "Thank you for riding with SwiftRide.",
      });
      setDriverFound(false);
    }
  }, [phase]);

  const handleBookRide = () => {
    if (!pickup || !dropoff) {
      toast({
        title: "Missing Information",
        description: "Please enter both pickup and drop-off locations.",
        variant: "destructive",
      });
      return;
    }

    if (!pickupLocation || !dropoffLocation) {
      toast({
        title: "Invalid Locations",
        description: "Please enter valid addresses that can be found on the map.",
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
        description: "Alex K. is on the way. Check the map for real-time tracking.",
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
                    {isGeocoding && pickup.length > 3 && (
                      <Loader2 className="absolute right-12 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-border" />
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
                    </div>
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <div className="relative">
                    <LocationInput
                      type="dropoff"
                      value={dropoff}
                      onChange={setDropoff}
                      placeholder="Enter drop-off location"
                    />
                    {isGeocoding && dropoff.length > 3 && (
                      <Loader2 className="absolute right-12 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
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
                {pickupLocation && dropoffLocation && (
                  <div className="p-4 rounded-xl bg-secondary mb-6 animate-fade-in">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Estimated Time</span>
                      </div>
                      <span className="font-display font-semibold text-foreground">
                        {eta ? `~${eta} min` : 'Calculating...'}
                      </span>
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
                  disabled={isSearching || driverFound || !pickupLocation || !dropoffLocation}
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Finding Driver...
                    </>
                  ) : driverFound ? (
                    phase === 'to-pickup' ? "Driver Approaching" : 
                    phase === 'to-dropoff' ? "Trip In Progress" : 
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
              <MapboxMap
                className="h-full min-h-[300px] lg:min-h-[600px]"
                showRoute={pickupLocation !== null && dropoffLocation !== null}
                pickupLocation={pickupLocation}
                dropoffLocation={dropoffLocation}
                driverLocation={driverFound ? driverLocation : null}
                onEtaUpdate={setEta}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
