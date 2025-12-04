import { useState, useCallback } from 'react';

interface Location {
  lat: number;
  lng: number;
}

interface GeocodingResult {
  location: Location;
  placeName: string;
}

const STORAGE_KEY = 'mapbox_public_token';

export function useGeocoding() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const geocode = useCallback(async (address: string): Promise<GeocodingResult | null> => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) {
      setError('Mapbox token not configured');
      return null;
    }

    if (!address.trim()) {
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&limit=1`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const feature = data.features[0];
        return {
          location: {
            lng: feature.center[0],
            lat: feature.center[1],
          },
          placeName: feature.place_name,
        };
      }

      setError('Location not found');
      return null;
    } catch (err) {
      console.error('Geocoding error:', err);
      setError('Failed to geocode address');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reverseGeocode = useCallback(async (location: Location): Promise<string | null> => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) {
      return null;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.lng},${location.lat}.json?access_token=${token}&limit=1`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        return data.features[0].place_name;
      }

      return null;
    } catch (err) {
      console.error('Reverse geocoding error:', err);
      return null;
    }
  }, []);

  return {
    geocode,
    reverseGeocode,
    isLoading,
    error,
  };
}
