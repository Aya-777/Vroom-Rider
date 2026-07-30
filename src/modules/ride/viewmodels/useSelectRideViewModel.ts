import { useEffect, useState } from 'react';
import { RideValidationErrors } from '../types/ride.types';
import { validateRideInputs } from '../utils/selectRideValidation';
import { useRideStore } from '../store/useRideStore';
import { useTranslation } from 'react-i18next';
import { useRideRepository } from '../repositories/rideRepositories';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes';
import { useLocationSearch } from '../hooks/useLocationSearch';
import {
  GeocodeResult,
  reverseGeocode,
} from '../../../core/services/location/GeoCodingService';
import LocationService from '../../../core/services/location/LocationService';
import { useLocationStore } from '../../../core/store/locationStore';
import { rideApi } from '../services/rideApi';
import { SavedPlace } from '../types/savedPlaces.types';

export function useSelectRideViewModel() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const currentLocation = useLocationStore(state => state.currentLocation);
  const {
    setRideDetails,
    rideData,
    savedPlaces,
    setSavedPlaces,
    setEstimate,
    setPickingLocation,
    selectedMapLocation,
    setSelectedMapLocation,
  } = useRideStore();

  const pickupStop = rideData.stops?.find(stop => stop.stopType === 'PICKUP');

  const destinationStop = rideData.stops?.find(
    stop => stop.stopType === 'DROP_OFF',
  );

  // --- UI State ---
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
  const [selectedPerson, setSelectedPerson] = useState(
    rideData.isForSomeoneElse ? 'otherContact' : 'forMe',
  );
  const [selectedTime, setSelectedTime] = useState(
    rideData.scheduledAt ?? 'now',
  );
  const [contactPhone, setContactPhone] = useState(
    rideData.passengerContactPhone ?? '',
  );
  type ActiveInput = 'pickup' | 'destination' | null;
  const [activeInput, setActiveInput] = useState<ActiveInput>(null);
  const pickupSearch = useLocationSearch(fromText);
  const destinationSearch = useLocationSearch(toText);
  const [hasInitializedPickup, setHasInitializedPickup] = useState(false);
  const [isSheetVisible, setIsSheetVisible] = useState(true);

  const { t } = useTranslation('selectRide');

  const {
    data: savedPlacesData,
    isLoading: savedPlacesLoading,
    error: savedPlacesError,
    refetch: fetchSavedPlaces,
  } = useRideRepository.useSavedPlaces(isModalVisible);
  const { mutate: deleteSavedPlace } = useRideRepository.useDeleteSavedPlace();

  // --- Set current location as pickup initially ---
  useEffect(() => {
    const setInitialPickup = async () => {
      if (!currentLocation || hasInitializedPickup) {
        return;
      }

      const address = await LocationService.reverseGeocode(
        currentLocation.latitude,
        currentLocation.longitude,
      );

      setFromText(address);

      setPickupCoordinates({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });

      setHasInitializedPickup(true);
    };

    setInitialPickup();
  }, [currentLocation, hasInitializedPickup]);

  // store the saved places api response in zustand
  useEffect(() => {
    if (savedPlacesData) {
      setSavedPlaces(savedPlacesData);
    }
  }, [savedPlacesData, setSavedPlaces]);

  // --- Ride Data Handlers ---
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

  const onPickupFocus = () => {
    setActiveInput('pickup');
  };

  const onDestinationFocus = () => {
    setActiveInput('destination');
  };

  // --- Logic ---
  const validate = (): boolean => {
    const rawErrors = validateRideInputs(fromText, toText);
    const translatedErrors: RideValidationErrors = {};
    Object.keys(rawErrors).forEach(key => {
      translatedErrors[key as keyof RideValidationErrors] = t(rawErrors[key]);
    });
    setErrors(translatedErrors);
    return Object.keys(rawErrors).length === 0;
  };

  // --- Actions ---

  const onAddPlacePress = () => {
    navigation.navigate('AddNewPlace');
  };

  const onDeleteSavedPlace = (id: number) => {
    deleteSavedPlace(id, {
      onError: error => {
        console.error('Failed to delete saved place', error);
      },
    });
  };

  const handleFlipModal = () => {
    if (!isModalVisible) {
      fetchSavedPlaces();
    }

    setIsModalVisible(!isModalVisible);
  };

  const handleBottomSheet = (visible: boolean) => {
    setIsSheetVisible(visible);
  };

  const setActiveInputText = (value: string) => {
    if (activeInput === 'pickup') {
      setFromText(value);
    } else {
      setToText(value);
    }
  };

  const onSetOnMap = () => {
    handleBottomSheet(false);
    setPickingLocation(true);
  };

  const onConfirmLocation = async () => {
    if (!selectedMapLocation) {
      return;
    }

    const { latitude, longitude } = selectedMapLocation;

    const address = await reverseGeocode(latitude, longitude);

    setActiveInputText(address || '');

    setPickingLocation(false);
    handleBottomSheet(true);
  };

  const onSelectPlace = (place: SavedPlace) => {
    if(activeInput === 'pickup'){
      setFromText(place.address);
      setPickupCoordinates(place);
    }else{
      setToText(place.address);
      setDestinationCoordinates(place);
    }
    setIsModalVisible(false);
  }

  const onNextPress = async () => {
    const stops = [
      {
        address: fromText,
        latitude: pickupCoordinates.latitude,
        longitude: pickupCoordinates.longitude,
        order: 0,
        stop_type: 'PICKUP' as const,
      },
      {
        address: toText,
        latitude: destinationCoordinates.latitude,
        longitude: destinationCoordinates.longitude,
        order: 1,
        stop_type: 'DROP_OFF' as const,
      },
    ];
    try {
      const estimate = await rideApi.estimateInitial({
        stops,
      });

      setEstimate(estimate);

      setRideDetails({
        stops: [
          {
            address: fromText,
            latitude: pickupCoordinates.latitude,
            longitude: pickupCoordinates.longitude,
            order: 0,
            stopType: 'PICKUP',
          },
          {
            address: toText,
            latitude: destinationCoordinates.latitude,
            longitude: destinationCoordinates.longitude,
            order: 1,
            stopType: 'DROP_OFF',
          },
        ],
        isForSomeoneElse: selectedPerson === 'otherContact',
        scheduledAt: selectedTime,
        passengerContactPhone: contactPhone,
      });
    } catch (error) {
      console.log('Estimate Error:', error);
    }
  };

  return {
    // UI State
    isNowDropdownOpen,
    isForMeDropdownOpen,
    errors,
    isModalVisible,
    savedPlacesLoading,
    savedPlacesError,

    // Ride Data
    fromText,
    toText,
    selectedPerson,
    selectedTime,
    contactPhone,
    savedPlaces,

    // UI Setters
    setIsNowDropdownOpen,
    setIsForMeDropdownOpen,
    setIsModalVisible,
    activeInput,
    onPickupFocus,
    onDestinationFocus,
    isSheetVisible,

    // Ride Setters
    setFromText,
    setToText,
    setSelectedPerson,
    setSelectedTime,
    setContactPhone,

    // Actions
    validate,
    handleFlipModal,
    onAddPlacePress,
    onNextPressVM: onNextPress,

    pickupResults: pickupSearch.results,
    destinationResults: destinationSearch.results,
    pickupSearching: pickupSearch.isSearching,
    destinationSearching: destinationSearch.isSearching,
    onSelectPickup,
    onSelectDestination,
    onSelectPlace,
    onDeleteSavedPlace,
    onSetOnMap,
    onConfirmLocation,
  };
}
