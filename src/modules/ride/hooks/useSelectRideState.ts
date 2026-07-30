// hooks/useSelectRideState.ts

import { useEffect, useState } from 'react';
import { RideParams, RideValidationErrors } from '../types/ride.types';
import { GeocodeResult } from '../../../core/services/location/GeoCodingService';
import { useLocationSearch } from './useLocationSearch';
import { useInitialPickup } from './useInitialPickup';
import { useLocationStore } from '../../../core/store/locationStore';

export type ActiveInput = 'pickup' | 'destination' | null;

export function useSelectRideState(rideData: Partial<RideParams>) {
  const currentLocation = useLocationStore(state => state.currentLocation);
  const pickup = useInitialPickup(currentLocation);

  const pickupStop = rideData.stops?.find(
    (stop: { stopType: string }) => stop.stopType === 'PICKUP',
  );

  const destinationStop = rideData.stops?.find(
    (stop: { stopType: string }) => stop.stopType === 'DROP_OFF',
  );

  const [isNowDropdownOpen, setIsNowDropdownOpen] = useState(false);
  const [isForMeDropdownOpen, setIsForMeDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<RideValidationErrors>({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [fromText, setFromText] = useState(pickupStop?.address ?? '');

  const [toText, setToText] = useState(destinationStop?.address ?? '');

  const [pickupCoordinates, setPickupCoordinates] = useState({
    latitude: pickupStop?.latitude ?? 0,
    longitude: pickupStop?.longitude ?? 0,
  });

  const [destinationCoordinates, setDestinationCoordinates] = useState({
    latitude: destinationStop?.latitude ?? 0,
    longitude: destinationStop?.longitude ?? 0,
  });

  const pickupSearch = useLocationSearch(fromText);
  const destinationSearch = useLocationSearch(toText);

  const [selectedPerson, setSelectedPerson] = useState(
    rideData.isForSomeoneElse ? 'otherContact' : 'forMe',
  );

  const [selectedTime, setSelectedTime] = useState(
    rideData.scheduledAt ?? 'now',
  );

  const [contactPhone, setContactPhone] = useState(
    rideData.passengerContactPhone ?? '',
  );

  const [activeInput, setActiveInput] = useState<ActiveInput>('pickup');

  const [isSheetVisible, setIsSheetVisible] = useState(true);

  const onPickupFocus = () => {
    setActiveInput('pickup');
  };

  const onDestinationFocus = () => {
    setActiveInput('destination');
  };

  const onSelectPickup = (place: GeocodeResult) => {
    pickupSearch.clearResults();
    setFromText(place.address);
    setPickupCoordinates({
      latitude: place.latitude,
      longitude: place.longitude,
    });
    setActiveInput(null);
  };

  const onSelectDestination = (place: GeocodeResult) => {
    destinationSearch.clearResults();
    setToText(place.address);
    setDestinationCoordinates({
      latitude: place.latitude,
      longitude: place.longitude,
    });
    setActiveInput(null);
  };

  useEffect(() => {
    // so that it doesn't overwrite an existing pickup from rideData
    if (!pickup || pickupStop) {
      return;
    }

    setFromText(pickup.address);

    setPickupCoordinates({
      latitude: pickup.latitude,
      longitude: pickup.longitude,
    });
  }, [pickup, pickupStop]);

  return {
    isNowDropdownOpen,
    setIsNowDropdownOpen,

    isForMeDropdownOpen,
    setIsForMeDropdownOpen,

    errors,
    setErrors,

    isModalVisible,
    setIsModalVisible,

    fromText,
    setFromText,

    toText,
    setToText,

    pickupCoordinates,
    setPickupCoordinates,

    pickupSearch,
    destinationSearch,

    destinationCoordinates,
    setDestinationCoordinates,

    selectedPerson,
    setSelectedPerson,

    selectedTime,
    setSelectedTime,

    contactPhone,
    setContactPhone,

    activeInput,
    setActiveInput,

    isSheetVisible,
    setIsSheetVisible,

    onPickupFocus,
    onDestinationFocus,

    onSelectPickup,
    onSelectDestination,
  };
}
