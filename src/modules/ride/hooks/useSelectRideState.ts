import { useEffect, useRef, useState } from 'react';
import {
  ActiveInput,
  RideParams,
  DraftStop,
} from '../types/ride.types';

import { GeocodeResult } from '../../../core/services/location/GeoCodingService';
import { useLocationSearch } from './useLocationSearch';
import { useInitialPickup } from './useInitialPickup';
import { useLocationStore } from '../../../core/store/locationStore';
import { useCurrentUser } from '../../../core/store/userStore';
import { SavedPlace } from '../types/savedPlaces.types';

export function useSelectRideState(rideData: Partial<RideParams>) {
  const currentLocation = useLocationStore(
    state => state.currentLocation,
  );

  const user = useCurrentUser();

  const pickup = useInitialPickup(currentLocation);

  // --------------------------------
  // Existing ride data
  // --------------------------------

  const pickupStop = rideData.stops?.find(
    stop => stop.stop_type === 'PICKUP',
  );

  const destinationStop = rideData.stops?.find(
    stop => stop.stop_type === 'DROP_OFF',
  );

  // --------------------------------
  // Pickup initialization
  // --------------------------------

  /**
   * If rideData already has a pickup,
   * we consider pickup initialized immediately.
   *
   * If it doesn't, we wait for GPS and initialize
   * from GPS exactly once.
   */
  const hasInitializedPickup = useRef(!!pickupStop);

  // --------------------------------
  // Pickup / Destination
  // --------------------------------

  const [fromText, setFromText] = useState(
    pickupStop?.address ?? '',
  );

  const [toText, setToText] = useState(
    destinationStop?.address ?? '',
  );

  const [pickupCoordinates, setPickupCoordinates] = useState({
    latitude: pickupStop?.latitude ?? 0,
    longitude: pickupStop?.longitude ?? 0,
  });

  const [destinationCoordinates, setDestinationCoordinates] =
    useState({
      latitude: destinationStop?.latitude ?? 0,
      longitude: destinationStop?.longitude ?? 0,
    });

  // --------------------------------
  // Initialize pickup from GPS once
  // --------------------------------

  useEffect(() => {
    // rideData already had a pickup.
    // Never touch it with GPS.
    if (hasInitializedPickup.current) {
      return;
    }

    // No GPS yet.
    if (!pickup) {
      return;
    }

    // Initialize from current location.
    setFromText(pickup.address);

    setPickupCoordinates({
      latitude: pickup.latitude,
      longitude: pickup.longitude,
    });

    // VERY IMPORTANT:
    // From now on, GPS must never modify pickup.
    hasInitializedPickup.current = true;
  }, [pickup]);

  // --------------------------------
  // Draft Stops
  // --------------------------------

  const [draftStops, setDraftStops] = useState<DraftStop[]>(() =>
    (rideData.stops ?? [])
      .filter(stop => stop.stop_type === 'STOP')
      .sort((a, b) => a.order - b.order)
      .map(stop => ({
        id: `${stop.order}-${Date.now()}-${Math.random()}`,
        address: stop.address,
        latitude: stop.latitude,
        longitude: stop.longitude,
      })),
  );

  const [activeStopId, setActiveStopId] =
    useState<string | null>(null);

  // --------------------------------
  // Location Searches
  // --------------------------------

  const pickupSearch = useLocationSearch(fromText);

  const destinationSearch = useLocationSearch(toText);

  const activeStop = draftStops.find(
    stop => stop.id === activeStopId,
  );

  const stopSearch = useLocationSearch(
    activeStop?.address ?? '',
  );

  // --------------------------------
  // Other state
  // --------------------------------

  const [isNowDropdownOpen, setIsNowDropdownOpen] =
    useState(false);

  const [isForMeDropdownOpen, setIsForMeDropdownOpen] =
    useState(false);

  const [errors, setErrors] = useState({});

  const [isModalVisible, setIsModalVisible] =
    useState(false);

  const [selectedPerson, setSelectedPerson] = useState(
    rideData.is_for_someone_else
      ? 'otherContact'
      : 'forMe',
  );

  const [selectedTime, setSelectedTime] = useState(
    rideData.scheduled_at ?? 'now',
  );

  const [contactPhone, setContactPhone] = useState(
    rideData.passenger_contact_phone ??
      user?.phone_number,
  );

  const [activeInput, setActiveInput] =
    useState<ActiveInput>('pickup');

  const [isSheetVisible, setIsSheetVisible] =
    useState(true);

  // --------------------------------
  // Pickup
  // --------------------------------

  const onPickupFocus = () => {
    setActiveStopId(null);
    setActiveInput('pickup');
  };

  const onSelectPickup = (place: GeocodeResult) => {
    pickupSearch.clearResults();

    setFromText(place.address);

    setPickupCoordinates({
      latitude: place.latitude,
      longitude: place.longitude,
    });

    // User has explicitly selected a pickup.
    // GPS must never replace it.
    hasInitializedPickup.current = true;

    setActiveInput(null);
  };

  // --------------------------------
  // Destination
  // --------------------------------

  const onDestinationFocus = () => {
    setActiveStopId(null);
    setActiveInput('destination');
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

  // --------------------------------
  // Stops
  // --------------------------------

  const addStop = () => {
    const newStop: DraftStop = {
      id: `${Date.now()}-${Math.random()}`,
      address: '',
    };

    setDraftStops(prev => [...prev, newStop]);
  };

  const removeStop = (id: string) => {
    setDraftStops(prev =>
      prev.filter(stop => stop.id !== id),
    );

    if (activeStopId === id) {
      stopSearch.clearResults();
      setActiveStopId(null);
      setActiveInput(null);
    }
  };

  const changeStop = (
    id: string,
    address: string,
  ) => {
    setDraftStops(prev =>
      prev.map(stop =>
        stop.id === id
          ? {
              ...stop,
              address,
              latitude: undefined,
              longitude: undefined,
            }
          : stop,
      ),
    );

    setActiveStopId(id);
    setActiveInput(`stop-${id}`);
  };

  const onStopFocus = (id: string) => {
    setActiveStopId(id);
    setActiveInput(`stop-${id}`);
  };

  const onSelectStop = (place: GeocodeResult) => {
    if (!activeStopId) {
      return;
    }

    setDraftStops(prev =>
      prev.map(stop =>
        stop.id === activeStopId
          ? {
              ...stop,
              address: place.address,
              latitude: place.latitude,
              longitude: place.longitude,
            }
          : stop,
      ),
    );

    stopSearch.clearResults();

    setActiveStopId(null);
    setActiveInput(null);
  };

  const onSelectSavedStop = (place: SavedPlace) => {
    if (!activeStopId) {
      return;
    }

    setDraftStops(prev =>
      prev.map(stop =>
        stop.id === activeStopId
          ? {
              ...stop,
              address: place.address,
              latitude: place.latitude,
              longitude: place.longitude,
            }
          : stop,
      ),
    );

    setActiveStopId(null);
    setActiveInput(null);
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

    destinationCoordinates,
    setDestinationCoordinates,

    pickupSearch,
    destinationSearch,

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
    onSelectPickup,

    onDestinationFocus,
    onSelectDestination,

    draftStops,
    addStop,
    removeStop,
    changeStop,
    onStopFocus,
    onSelectStop,
    onSelectSavedStop,
    stopSearch,
  };
}