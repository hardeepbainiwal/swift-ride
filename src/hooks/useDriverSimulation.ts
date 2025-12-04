import { useState, useEffect, useRef, useCallback } from 'react';

interface Location {
  lat: number;
  lng: number;
}

interface UseDriverSimulationOptions {
  pickupLocation: Location | null;
  dropoffLocation: Location | null;
  isActive: boolean;
  speed?: number; // Updates per second
}

export function useDriverSimulation({
  pickupLocation,
  dropoffLocation,
  isActive,
  speed = 2,
}: UseDriverSimulationOptions) {
  const [driverLocation, setDriverLocation] = useState<Location | null>(null);
  const [phase, setPhase] = useState<'idle' | 'to-pickup' | 'to-dropoff' | 'completed'>('idle');
  const animationRef = useRef<number | null>(null);
  const progressRef = useRef(0);

  const interpolate = useCallback((start: Location, end: Location, t: number): Location => {
    return {
      lat: start.lat + (end.lat - start.lat) * t,
      lng: start.lng + (end.lng - start.lng) * t,
    };
  }, []);

  const startSimulation = useCallback(() => {
    if (!pickupLocation) return;

    // Start driver from a random offset position
    const startLocation: Location = {
      lat: pickupLocation.lat + (Math.random() - 0.5) * 0.02,
      lng: pickupLocation.lng + (Math.random() - 0.5) * 0.02,
    };

    setDriverLocation(startLocation);
    setPhase('to-pickup');
    progressRef.current = 0;
  }, [pickupLocation]);

  const stopSimulation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setPhase('idle');
    setDriverLocation(null);
    progressRef.current = 0;
  }, []);

  useEffect(() => {
    if (!isActive) {
      stopSimulation();
      return;
    }

    if (isActive && pickupLocation && phase === 'idle') {
      startSimulation();
    }
  }, [isActive, pickupLocation, phase, startSimulation, stopSimulation]);

  useEffect(() => {
    if (!isActive || phase === 'idle' || phase === 'completed') return;

    let lastTime = performance.now();
    const duration = phase === 'to-pickup' ? 10000 : 15000; // ms to complete each phase

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      progressRef.current += deltaTime / duration;

      if (progressRef.current >= 1) {
        if (phase === 'to-pickup') {
          setDriverLocation(pickupLocation);
          setPhase('to-dropoff');
          progressRef.current = 0;
        } else if (phase === 'to-dropoff') {
          setDriverLocation(dropoffLocation);
          setPhase('completed');
          return;
        }
      } else {
        let start: Location | null = null;
        let end: Location | null = null;

        if (phase === 'to-pickup' && pickupLocation) {
          // Calculate start from initial offset
          start = driverLocation || {
            lat: pickupLocation.lat + 0.01,
            lng: pickupLocation.lng + 0.01,
          };
          end = pickupLocation;
        } else if (phase === 'to-dropoff' && pickupLocation && dropoffLocation) {
          start = pickupLocation;
          end = dropoffLocation;
        }

        if (start && end) {
          const newLocation = interpolate(start, end, progressRef.current);
          setDriverLocation(newLocation);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, phase, pickupLocation, dropoffLocation, driverLocation, interpolate]);

  return {
    driverLocation,
    phase,
    startSimulation,
    stopSimulation,
    isMoving: phase === 'to-pickup' || phase === 'to-dropoff',
  };
}
