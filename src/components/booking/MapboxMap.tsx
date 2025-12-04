import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Clock, Loader2 } from 'lucide-react';

interface MapboxMapProps {
  className?: string;
  showRoute?: boolean;
  driverLocation?: { lat: number; lng: number } | null;
  pickupLocation?: { lat: number; lng: number } | null;
  dropoffLocation?: { lat: number; lng: number } | null;
  onEtaUpdate?: (eta: number | null) => void;
}

const STORAGE_KEY = 'mapbox_public_token';

export function MapboxMap({
  className,
  showRoute = false,
  driverLocation,
  pickupLocation,
  dropoffLocation,
  onEtaUpdate,
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const driverMarker = useRef<mapboxgl.Marker | null>(null);
  const pickupMarker = useRef<mapboxgl.Marker | null>(null);
  const dropoffMarker = useRef<mapboxgl.Marker | null>(null);
  
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [tokenInput, setTokenInput] = useState('');
  const [isMapReady, setIsMapReady] = useState(false);
  const [eta, setEta] = useState<number | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [77.5946, 12.9716], // Default to Bangalore
        zoom: 12,
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({ visualizePitch: true }),
        'top-right'
      );

      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
          showUserHeading: true,
        }),
        'top-right'
      );

      map.current.on('load', () => {
        setIsMapReady(true);
        
        // Add route source
        map.current?.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: { type: 'LineString', coordinates: [] },
          },
        });

        // Add route layer
        map.current?.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#06b6d4',
            'line-width': 5,
            'line-opacity': 0.8,
          },
        });

        // Add route glow layer
        map.current?.addLayer({
          id: 'route-glow',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#06b6d4',
            'line-width': 12,
            'line-opacity': 0.3,
            'line-blur': 3,
          },
        }, 'route');
      });

      return () => {
        map.current?.remove();
        map.current = null;
        setIsMapReady(false);
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      localStorage.removeItem(STORAGE_KEY);
      setToken('');
    }
  }, [token]);

  // Create custom marker elements
  const createMarkerElement = useCallback((type: 'driver' | 'pickup' | 'dropoff') => {
    const el = document.createElement('div');
    el.className = 'flex items-center justify-center';
    
    if (type === 'driver') {
      el.innerHTML = `
        <div class="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/50 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rotate-45">
            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
          </svg>
        </div>
      `;
    } else if (type === 'pickup') {
      el.innerHTML = `
        <div class="relative">
          <div class="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-lg"></div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
        </div>
      `;
    } else {
      el.innerHTML = `
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#ef4444" stroke="white" stroke-width="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3" fill="white"/>
          </svg>
        </div>
      `;
    }
    
    return el;
  }, []);

  // Update driver marker
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    if (driverLocation) {
      if (!driverMarker.current) {
        driverMarker.current = new mapboxgl.Marker({
          element: createMarkerElement('driver'),
        })
          .setLngLat([driverLocation.lng, driverLocation.lat])
          .addTo(map.current);
      } else {
        driverMarker.current.setLngLat([driverLocation.lng, driverLocation.lat]);
      }
    } else if (driverMarker.current) {
      driverMarker.current.remove();
      driverMarker.current = null;
    }
  }, [driverLocation, isMapReady, createMarkerElement]);

  // Update pickup marker
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    if (pickupLocation) {
      if (!pickupMarker.current) {
        pickupMarker.current = new mapboxgl.Marker({
          element: createMarkerElement('pickup'),
        })
          .setLngLat([pickupLocation.lng, pickupLocation.lat])
          .addTo(map.current);
      } else {
        pickupMarker.current.setLngLat([pickupLocation.lng, pickupLocation.lat]);
      }
    } else if (pickupMarker.current) {
      pickupMarker.current.remove();
      pickupMarker.current = null;
    }
  }, [pickupLocation, isMapReady, createMarkerElement]);

  // Update dropoff marker
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    if (dropoffLocation) {
      if (!dropoffMarker.current) {
        dropoffMarker.current = new mapboxgl.Marker({
          element: createMarkerElement('dropoff'),
        })
          .setLngLat([dropoffLocation.lng, dropoffLocation.lat])
          .addTo(map.current);
      } else {
        dropoffMarker.current.setLngLat([dropoffLocation.lng, dropoffLocation.lat]);
      }
    } else if (dropoffMarker.current) {
      dropoffMarker.current.remove();
      dropoffMarker.current = null;
    }
  }, [dropoffLocation, isMapReady, createMarkerElement]);

  // Fetch and display route
  useEffect(() => {
    if (!map.current || !isMapReady || !showRoute) return;
    
    const start = driverLocation || pickupLocation;
    const end = dropoffLocation;

    if (!start || !end) {
      // Clear route if no valid points
      const source = map.current.getSource('route') as mapboxgl.GeoJSONSource;
      if (source) {
        source.setData({
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: [] },
        });
      }
      setEta(null);
      onEtaUpdate?.(null);
      return;
    }

    const fetchRoute = async () => {
      setIsLoadingRoute(true);
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson&overview=full&access_token=${token}`
        );
        const data = await response.json();

        if (data.routes && data.routes[0]) {
          const route = data.routes[0];
          const coordinates = route.geometry.coordinates;
          const duration = Math.round(route.duration / 60); // Convert to minutes

          setEta(duration);
          onEtaUpdate?.(duration);

          const source = map.current?.getSource('route') as mapboxgl.GeoJSONSource;
          if (source) {
            source.setData({
              type: 'Feature',
              properties: {},
              geometry: { type: 'LineString', coordinates },
            });
          }

          // Fit map to route bounds
          const bounds = new mapboxgl.LngLatBounds();
          coordinates.forEach((coord: [number, number]) => bounds.extend(coord));
          map.current?.fitBounds(bounds, { padding: 80, duration: 1000 });
        }
      } catch (error) {
        console.error('Error fetching route:', error);
      } finally {
        setIsLoadingRoute(false);
      }
    };

    fetchRoute();
  }, [showRoute, driverLocation, pickupLocation, dropoffLocation, isMapReady, token, onEtaUpdate]);

  // Fit map to markers when they change
  useEffect(() => {
    if (!map.current || !isMapReady) return;
    if (!showRoute && (pickupLocation || dropoffLocation)) {
      const bounds = new mapboxgl.LngLatBounds();
      
      if (pickupLocation) bounds.extend([pickupLocation.lng, pickupLocation.lat]);
      if (dropoffLocation) bounds.extend([dropoffLocation.lng, dropoffLocation.lat]);
      if (driverLocation) bounds.extend([driverLocation.lng, driverLocation.lat]);

      if (!bounds.isEmpty()) {
        map.current.fitBounds(bounds, { padding: 80, duration: 1000 });
      }
    }
  }, [pickupLocation, dropoffLocation, driverLocation, isMapReady, showRoute]);

  const handleSaveToken = () => {
    if (tokenInput.trim()) {
      localStorage.setItem(STORAGE_KEY, tokenInput.trim());
      setToken(tokenInput.trim());
    }
  };

  if (!token) {
    return (
      <div className={cn("relative rounded-2xl overflow-hidden bg-secondary flex items-center justify-center", className)}>
        <div className="p-6 max-w-md text-center space-y-4">
          <MapPin className="w-12 h-12 text-primary mx-auto" />
          <h3 className="font-display text-xl font-bold text-foreground">Connect Mapbox</h3>
          <p className="text-sm text-muted-foreground">
            Enter your Mapbox public token to enable real-time maps. Get your token from{' '}
            <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              mapbox.com
            </a>
          </p>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="pk.eyJ1IjoieW91..."
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="bg-background/50"
            />
            <Button onClick={handleSaveToken} className="w-full" variant="hero">
              <Navigation className="w-4 h-4 mr-2" />
              Enable Maps
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative rounded-2xl overflow-hidden", className)}>
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* ETA Display */}
      {eta !== null && (
        <div className="absolute top-4 left-4 px-4 py-2 rounded-xl glass-strong animate-fade-in">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">ETA: {eta} min</span>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoadingRoute && (
        <div className="absolute bottom-4 right-4 px-3 py-2 rounded-lg glass text-xs text-muted-foreground flex items-center gap-2">
          <Loader2 className="w-3 h-3 animate-spin" />
          Calculating route...
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 px-3 py-2 rounded-lg glass text-xs space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-muted-foreground">Pickup</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <span className="text-muted-foreground">Drop-off</span>
        </div>
        {driverLocation && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Driver</span>
          </div>
        )}
      </div>
    </div>
  );
}
