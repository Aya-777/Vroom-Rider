import { useEffect, useMemo, useState } from 'react';
import { useRideStore } from '../store/useRideStore';
import { RideFilter } from '../types/ride.types';
import { fetchFilters } from '../utils/fetchFilters';
import { useFavoriteDriversStore } from '../../favoriteDrivers/store/useFavoriteDriversStore';

export function useTripStartedViewModel() {
  const currentRide = useRideStore(state => state.currentRide);

  const toggleFavorite = useFavoriteDriversStore(
    state => state.toggleFavorite,
  );

  const favoriteDrivers = useFavoriteDriversStore(
    state => state.drivers,
  );

  const fetchFavoriteDrivers = useFavoriteDriversStore(
    state => state.fetchFavoriteDrivers,
  );

  const [tip, setTip] = useState('0');
  const [errors, setErrors] = useState({});
  const [filters, setFilters] = useState<RideFilter[]>([]);

  useEffect(() => {
    fetchFavoriteDrivers();
  }, [fetchFavoriteDrivers]);

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
        currentRide?.preference_ids?.includes(Number(filter.id)),
      )
      .reduce(
        (sum, filter) => sum + Number(filter.extra_fee),
        0,
      );
  }, [filters, currentRide?.preference_ids]);

  const isFavorite = useMemo(() => {
    const driverId = currentRide?.driver?.id;

    if (!driverId) {
      return false;
    }

    return favoriteDrivers?.some(
      favorite => favorite.driver_id === driverId,
    ) ?? false;
  }, [favoriteDrivers, currentRide?.driver?.id]);

  return {
    currentRide,

    // Favorite driver
    toggleFavorite,
    isFavorite,

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