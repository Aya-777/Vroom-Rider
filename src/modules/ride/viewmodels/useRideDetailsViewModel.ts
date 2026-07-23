import { useState } from 'react';
import { useRideStore } from '../store/useRideStore';

export function useRideDetailsViewModel() {
  const { rideData, setRideDetails } = useRideStore();

  // UI State only
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Ride data setters
  const setSelectedVehicle = (vehicle: string) => {
    setRideDetails({
      vehicleType: vehicle,
    });
  };

  const setSelectedPayment = (payment: string) => {
    setRideDetails({
      payment,
    });
  };

  const updateRideDetails = () => {};

  return {
    // ride Data
    selectedVehicle: rideData.vehicleType ?? 'economy',
    selectedPayment: rideData.payment ?? 'cash',

    // UI
    isDropdownOpen,

    // Setters,
    setSelectedVehicle,
    setSelectedPayment,
    setIsDropdownOpen,

    updateRideDetails,
  };
}
