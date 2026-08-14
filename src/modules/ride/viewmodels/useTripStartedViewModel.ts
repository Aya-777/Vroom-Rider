import { useEffect, useState } from 'react';
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
  const [filtersTotal, setFiltersTotal] = useState(0);

  // Fetch filters
  useEffect(() => {
    let mounted = true;

    (async () => {
      const f = await fetchFilters();
      if (mounted) setFilters(f);
    })();

    return () => {
      mounted = false;
    };
  }, [currentRide?.preference_ids]);

  const handleSubmit = () => {
    // navigation.navigate('HomeScreen');
  };

  const handleCloseReviewModal = () => {
    // navigation.navigate('HomeScreen');
  };

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

    // Actions
    handleSubmit,
    handleCloseReviewModal,
  };
}