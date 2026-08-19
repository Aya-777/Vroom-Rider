import { useEffect, useMemo, useState } from 'react';
import { useRideStore } from '../store/useRideStore';
import { rideApi } from '../services/rideApi';
import { TripStatus } from '../types/RideState';
import { RideFilter } from '../types/ride.types';
import {fetchFilters} from '../utils/fetchFilters';

export function useTripStartedViewModel() {
  const currentRide = useRideStore(state => state.currentRide);

  // --- UI State ---
  const [tip, setTip] = useState('0');
  const [errors, setErrors] = useState({});

  // --- Preferences ---
  const [filters, setFilters] = useState<RideFilter[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const f = await fetchFilters();

      if (mounted) {
        setFilters(f);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [currentRide?.preference_ids]);

  const filtersTotal = useMemo(() => {
    return filters
      .filter(filter =>
        currentRide?.preference_ids?.includes(Number(filter.id))
      )
      .reduce(
        (sum, filter) => sum + Number(filter.extra_fee),
        0,
      );
  }, [filters, currentRide?.preference_ids]);

  return {
    currentRide,

    // Preferences
    filters,
    filtersTotal,

    // State
    tip,
    errors,

    // Setters
    setTip,
    setErrors,

  };
}