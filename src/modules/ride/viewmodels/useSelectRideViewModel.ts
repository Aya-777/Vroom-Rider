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
import { GeocodeResult } from '../../../core/services/location/GeoCodingService';
import LocationService from '../../../core/services/location/LocationService';
import { useLocationStore } from '../../../core/store/locationStore';
import { rideApi } from '../services/rideApi';
import axios from 'axios';

export function useSelectRideViewModel() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const currentLocation = useLocationStore(state => state.currentLocation);
  const { setRideDetails, rideData, savedPlaces, setSavedPlaces, setEstimate } =
    useRideStore();

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

  const { t } = useTranslation('selectRide');

  const {
    data: savedPlacesData,
    isLoading: savedPlacesLoading,
    error: savedPlacesError,
    refetch: fetchSavedPlaces,
  } = useRideRepository.useSavedPlaces(isModalVisible);

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

  const handleFlipModal = () => {
    if (!isModalVisible) {
      fetchSavedPlaces();
    }

    setIsModalVisible(!isModalVisible);
  };

  const onNextPress = async () => {
    if (!validate()) {
      return;
    }
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
    console.log("stops ", stops)
    try {
      const estimate = await rideApi.estimateInitial({
        stops,
      });

      console.log('estimte : ', estimate);
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

      if (axios.isAxiosError(error)) {
        console.log('message:', error.message);
        console.log('config:', error.config);
        console.log('response:', error.response);
        console.log('request:', error.request);
      }
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
  };
}
