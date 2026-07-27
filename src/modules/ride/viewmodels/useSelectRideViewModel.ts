import { useEffect, useState } from 'react';
import { RideValidationErrors } from '../types/ride.types';
import { validateRideInputs } from '../utils/selectRideValidation';
import { useRideStore } from '../store/useRideStore';
import { useTranslation } from 'react-i18next';

export function useSelectRideViewModel(
  showAlert: (title: string, msg: string) => void,
  currentLocation: string,
) {
  const { setRideDetails, rideData } = useRideStore();

  // --- UI State ---
  const [isNowDropdownOpen, setIsNowDropdownOpen] = useState(false);
  const [isForMeDropdownOpen, setIsForMeDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<RideValidationErrors>({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { t } = useTranslation('selectRide');

  // --- Set current location as pickup initially ---
  useEffect(() => {
    if (currentLocation && !rideData.pickupLocation) {
      setRideDetails({
        pickupLocation: currentLocation,
      });
    }
  }, [currentLocation]);

  // --- Ride Data Handlers ---

  const setFromLocation = (value: string) => {
    setRideDetails({
      pickupLocation: value,
    });
  };

  const setToLocation = (value: string) => {
    setRideDetails({
      dropoffLocation: value,
    });
  };

  const setSelectedPerson = (value: string) => {
    setRideDetails({
      selectedPerson: value,
    });
  };

  const setSelectedTime = (value: string) => {
    setRideDetails({
      time: value,
    });
  };

  const setContactPhone = (value: string) => {
    setRideDetails({
      contactPhone: value,
    });
  };

  // --- Logic ---
  const validate = (): boolean => {
    const rawErrors = validateRideInputs(
      rideData.pickupLocation ?? '',
      rideData.dropoffLocation ?? '',
    );

    const translatedErrors: RideValidationErrors = {};

    Object.keys(rawErrors).forEach(key => {
      translatedErrors[key as keyof RideValidationErrors] = t(rawErrors[key]);
    });

    setErrors(translatedErrors);

    return Object.keys(rawErrors).length === 0;
  };

  // --- Actions ---
  const updateRideDetails = () => {
    if (!validate()) {
      showAlert(
        'Missing Information',
        'Please fill in both pickup and destination locations.',
      );

      return;
    }

    // No need to save here anymore.
    // Data is already stored in Zustand while typing.
  };

  const showSavedPlaces= () => {

  }

  const handleFlipModal = () => setIsModalVisible(!isModalVisible);

  return {
    // UI State
    isNowDropdownOpen,
    isForMeDropdownOpen,
    errors,
    isModalVisible,

    // Ride Data
    fromLocation: rideData.pickupLocation ?? '',
    toLocation: rideData.dropoffLocation ?? '',
    selectedPerson: rideData.selectedPerson ?? 'forMe',
    selectedTime: rideData.time ?? 'now',
    contactPhone: rideData.contactPhone ?? '',

    // UI Setters
    setIsNowDropdownOpen,
    setIsForMeDropdownOpen,
    setIsModalVisible,

    // Ride Setters
    setFromLocation,
    setToLocation,
    setSelectedPerson,
    setSelectedTime,
    setContactPhone,

    // Actions
    validate,
    updateRideDetails,
    handleFlipModal,

  };
}
