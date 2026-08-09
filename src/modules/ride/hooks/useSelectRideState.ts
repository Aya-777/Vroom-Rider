import { useEffect, useState } from 'react';
import { ActiveInput, RideParams, RideStop, RideValidationErrors, DraftStop } from '../types/ride.types';
import { GeocodeResult } from '../../../core/services/location/GeoCodingService';
import { useLocationSearch } from './useLocationSearch';
import { useInitialPickup } from './useInitialPickup';
import { useLocationStore } from '../../../core/store/locationStore';
import { useCurrentUser } from '../../../core/store/userStore';

export function useSelectRideState(rideData: Partial<RideParams>) {
  const currentLocation = useLocationStore(state => state.currentLocation);
  const user = useCurrentUser();
  const pickup = useInitialPickup(currentLocation);

  const pickupStop = rideData.stops?.find(stop => stop.stop_type === 'PICKUP');

  const destinationStop = rideData.stops?.find(
    stop => stop.stop_type === 'DROP_OFF',
  );

  const [isNowDropdownOpen, setIsNowDropdownOpen] = useState(false);
  const [isForMeDropdownOpen, setIsForMeDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<RideValidationErrors>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [draftStops, setDraftStops] = useState<DraftStop[]>([]);

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
    rideData.is_for_someone_else ? 'otherContact' : 'forMe',
  );

  const [selectedTime, setSelectedTime] = useState(
    rideData.scheduled_at ?? 'now',
  );

  const [contactPhone, setContactPhone] = useState(
    rideData.passenger_contact_phone ?? user?.phone_number,
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

  const addStop = () => {
    const newStop: DraftStop = {
      id: `${Date.now()}-${Math.random()}`,
      address: '',
    };

  setDraftStops(prev => [...prev, newStop]);
};

const removeStop = (id: string) => {
  setDraftStops(prev => prev.filter(stop => stop.id !== id));
};

const changeStop = (id: string, address: string) => {
  setDraftStops(prev =>
    prev.map(stop =>
      stop.id === id
        ? {
            ...stop,
            address,
          }
        : stop,
    ),
  );
};

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

    draftStops,
    addStop,
    removeStop,
    changeStop,
  };
}
