import { useEffect, useState } from 'react';
import { useRideStore } from '../store/useRideStore';
import { rideApi } from '../services/rideApi';

export function useTripStartedViewModel() {
  const { currentRide } = useRideStore();

  // --- UI State ---
  const [tip, setTip] = useState('0');
  const [errors, setErrors] = useState({});
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [isBillVisible, setIsBillVisible] = useState(false);
  const [filtersTotal, setFiltersTotal] = useState(0);

  useEffect(() => {
    const fetchPreferences = async () => {
      const preferenceIds = currentRide?.preference_ids;

      if (!preferenceIds?.length) {
        setFiltersTotal(0);
        return;
      }

      try {
        const preferences = await rideApi.getFilters();

        const total = preferences.reduce(
          (sum, preference) => sum + Number(preference.extra_fee ?? 0),
          0,
        );

        setFiltersTotal(total);
      } catch (error) {
        console.error(
          '[TripStartedVM] Failed to fetch preferences:',
          error,
        );

        setFiltersTotal(0);
      }
    };

    fetchPreferences();
  }, [currentRide?.preference_ids]);

  // Actions
  const handleSubmit = () => {
    // navigation.navigate('HomeScreen');
  };

  const handleCloseReviewModal = () => {
    // navigation.navigate('HomeScreen');
  };

  return {
    currentRide,

    // State
    tip,
    errors,
    isReviewVisible,
    isBillVisible,
    filtersTotal,

    // Setters
    setTip,
    setErrors,
    setIsBillVisible,
    setIsReviewVisible,

    // Actions
    handleSubmit,
    handleCloseReviewModal,
  };
}