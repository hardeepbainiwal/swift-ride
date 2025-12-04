import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { AvailabilityToggle } from "@/components/driver/AvailabilityToggle";
import { RideRequestCard } from "@/components/driver/RideRequestCard";
import { EarningsCard } from "@/components/driver/EarningsCard";
import { MapboxMap } from "@/components/booking/MapboxMap";
import { toast } from "@/hooks/use-toast";
import { Star, TrendingUp, Shield } from "lucide-react";

// Sample locations for simulation
const SAMPLE_RIDES = [
  {
    pickup: { lat: 12.9716, lng: 77.5946 },
    dropoff: { lat: 12.9352, lng: 77.6245 },
    pickupAddress: "MG Road, Bangalore",
    dropoffAddress: "Koramangala, Bangalore",
    distance: "4.2 km",
    fare: "$18.50",
  },
  {
    pickup: { lat: 12.9856, lng: 77.6056 },
    dropoff: { lat: 12.9566, lng: 77.6412 },
    pickupAddress: "Indiranagar, Bangalore",
    dropoffAddress: "Whitefield, Bangalore",
    distance: "8.5 km",
    fare: "$32.00",
  },
];

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);
  const [activeTrip, setActiveTrip] = useState(false);
  const [currentRide, setCurrentRide] = useState(SAMPLE_RIDES[0]);
  const [driverLocation, setDriverLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [eta, setEta] = useState<number | null>(null);

  // Simulate driver movement when trip is active
  useEffect(() => {
    if (!activeTrip || !driverLocation) return;

    const target = currentRide.dropoff;
    const interval = setInterval(() => {
      setDriverLocation((prev) => {
        if (!prev) return prev;
        
        const newLat = prev.lat + (target.lat - prev.lat) * 0.05;
        const newLng = prev.lng + (target.lng - prev.lng) * 0.05;
        
        // Check if close enough to destination
        const distance = Math.sqrt(
          Math.pow(target.lat - newLat, 2) + Math.pow(target.lng - newLng, 2)
        );
        
        if (distance < 0.001) {
          clearInterval(interval);
          return target;
        }
        
        return { lat: newLat, lng: newLng };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTrip, currentRide.dropoff]);

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      // Set initial driver location
      setDriverLocation({
        lat: 12.9716 + (Math.random() - 0.5) * 0.02,
        lng: 77.5946 + (Math.random() - 0.5) * 0.02,
      });
      
      toast({
        title: "You're now online",
        description: "You'll receive ride requests from nearby riders.",
      });
      // Simulate incoming request after going online
      setTimeout(() => {
        if (!activeTrip) {
          setCurrentRide(SAMPLE_RIDES[Math.floor(Math.random() * SAMPLE_RIDES.length)]);
          setHasRequest(true);
        }
      }, 5000);
    } else {
      toast({
        title: "You're now offline",
        description: "You won't receive any ride requests.",
      });
      setHasRequest(false);
      setDriverLocation(null);
    }
  };

  const handleAcceptRide = () => {
    setHasRequest(false);
    setActiveTrip(true);
    // Move driver to pickup location
    setDriverLocation(currentRide.pickup);
    toast({
      title: "Ride Accepted!",
      description: "Navigate to the pickup point to meet your rider.",
    });
  };

  const handleDeclineRide = () => {
    setHasRequest(false);
    toast({
      title: "Ride Declined",
      description: "You'll receive another request soon.",
    });
    // Simulate another request
    setTimeout(() => {
      if (isOnline && !activeTrip) {
        setCurrentRide(SAMPLE_RIDES[Math.floor(Math.random() * SAMPLE_RIDES.length)]);
        setHasRequest(true);
      }
    }, 8000);
  };

  const handleCompleteTrip = () => {
    setActiveTrip(false);
    setDriverLocation({
      lat: currentRide.dropoff.lat + (Math.random() - 0.5) * 0.01,
      lng: currentRide.dropoff.lng + (Math.random() - 0.5) * 0.01,
    });
    toast({
      title: "Trip Completed",
      description: `You earned ${currentRide.fare} from this trip!`,
    });
    
    // Simulate new request after completion
    setTimeout(() => {
      if (isOnline) {
        setCurrentRide(SAMPLE_RIDES[Math.floor(Math.random() * SAMPLE_RIDES.length)]);
        setHasRequest(true);
      }
    }, 10000);
  };

  return (
    <Layout>
      <section className="min-h-[calc(100vh-5rem)] py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Driver Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your availability and track your earnings
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Controls */}
            <div className="lg:col-span-1 space-y-6">
              {/* Availability Toggle */}
              <AvailabilityToggle isOnline={isOnline} onToggle={handleToggleOnline} />

              {/* Ride Request */}
              {hasRequest && (
                <RideRequestCard
                  pickup={currentRide.pickupAddress}
                  dropoff={currentRide.dropoffAddress}
                  distance={currentRide.distance}
                  fare={currentRide.fare}
                  timeLeft={15}
                  onAccept={handleAcceptRide}
                  onDecline={handleDeclineRide}
                />
              )}

              {/* Earnings Card */}
              <EarningsCard
                todayEarnings="$127.50"
                totalRides={8}
                onlineHours="5h 32m"
              />

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl glass">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-warning fill-warning" />
                    <span className="text-sm text-muted-foreground">Rating</span>
                  </div>
                  <p className="font-display text-2xl font-bold text-foreground">4.92</p>
                </div>
                <div className="p-4 rounded-xl glass">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-success" />
                    <span className="text-sm text-muted-foreground">Acceptance</span>
                  </div>
                  <p className="font-display text-2xl font-bold text-foreground">94%</p>
                </div>
              </div>

              {/* Verification Badge */}
              <div className="p-4 rounded-xl bg-success/10 border border-success/20 flex items-center gap-3">
                <Shield className="w-6 h-6 text-success" />
                <div>
                  <p className="font-semibold text-foreground">Verified Driver</p>
                  <p className="text-xs text-muted-foreground">All documents approved</p>
                </div>
              </div>
            </div>

            {/* Right Column - Map */}
            <div className="lg:col-span-2 space-y-4">
              <MapboxMap
                className="h-[400px] lg:h-[500px]"
                showRoute={activeTrip}
                driverLocation={driverLocation}
                pickupLocation={activeTrip ? currentRide.pickup : (hasRequest ? currentRide.pickup : null)}
                dropoffLocation={activeTrip ? currentRide.dropoff : (hasRequest ? currentRide.dropoff : null)}
                onEtaUpdate={setEta}
              />
              
              {/* Active Trip Overlay */}
              {activeTrip && (
                <div className="p-4 rounded-xl glass-strong animate-slide-up">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Trip</p>
                      <p className="font-display font-bold text-foreground">
                        {eta ? `ETA: ${eta} min to destination` : 'En route to destination'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {currentRide.pickupAddress} → {currentRide.dropoffAddress}
                      </p>
                    </div>
                    <button
                      onClick={handleCompleteTrip}
                      className="px-4 py-2 rounded-lg bg-success text-success-foreground font-semibold hover:bg-success/90 transition-colors"
                    >
                      Complete Trip
                    </button>
                  </div>
                </div>
              )}

              {/* Pending Request Info */}
              {hasRequest && !activeTrip && (
                <div className="p-4 rounded-xl glass animate-fade-in">
                  <p className="text-sm text-muted-foreground">
                    New ride request! Check the pickup and drop-off locations on the map.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
