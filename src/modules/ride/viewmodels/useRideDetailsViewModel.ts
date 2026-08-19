import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRideStore } from '../store/useRideStore';
import { RideFilter } from '../types/ride.types';
import { rideApi } from '../services/rideApi';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

export function useRideDetailsViewModel() {
  const { rideData, setRideDetails } = useRideStore();
  const { estimate, setEstimate } = useRideStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('cash');
  const [selectedFilterIds, setSelectedFilterIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<RideFilter[]>([]);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const selectedVehicle = useMemo(() => {
    return estimate?.pricing_tiers?.find(
      tier => tier.tier_id === selectedVehicleId,
    );
  }, [estimate, selectedVehicleId]);

  const updateRideDetails = (totalPrice: Double) => {
    setRideDetails({
      vehicle_type_id: selectedVehicleId.toString(),
      payment_method: selectedPayment === 'cash' ? 'CASH' : 'WALLET',
      preference_ids: selectedFilterIds.map(id => Number(id)),
      is_scheduled: rideData.is_scheduled,
    });

    if (!estimate || totalPrice === null) {
      return;
    }

    const updatedPricingTiers = estimate.pricing_tiers.map(tier =>
      tier.tier_id === selectedVehicleId
        ? {
            ...tier,
            estimated_price: totalPrice,
          }
        : tier,
    );

    setEstimate({
      ...estimate,
      pricing_tiers: updatedPricingTiers,
    });
  };

  const onSelectVehicle = (vehicleId: number) => {
    setSelectedVehicleId(vehicleId);
  };

  const loadFilters = useCallback(async () => {
    try {
      setIsLoadingFilters(true);

      const response = await rideApi.getFilters();

      const mappedFilters: RideFilter[] = response.map(
        (filter: RideFilter) => ({
          id: String(filter.id),
          code: filter.code,
          title: filter.title,
          extra_fee: Number(filter.extra_fee).toFixed(2),
          iconName: filter.iconName ?? 'filter-outline',
        }),
      );

      setFilters(mappedFilters);
    } catch (error) {
      console.error('Failed to load ride filters:', error);
    } finally {
      setIsLoadingFilters(false);
    }
  }, []);

  useEffect(() => {
    loadFilters();
  }, [loadFilters]);

  return {
    rideData,
    estimate,
    filters,

    selectedVehicleId,
    selectedVehicle,
    selectedPayment,
    selectedFilterIds,
    filtersVisible,

    isDropdownOpen,

    setSelectedFilterIds,
    setFiltersVisible,
    setSelectedVehicleId,
    setSelectedPayment,
    setIsDropdownOpen,

    onSelectVehicle,
    updateRideDetails,
  };
}
