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
import { useLocationStore } from '../../../core/store/useLocationStore';

export function useSelectRideViewModel(
  showAlert: (title: string, msg: string) => void,
) {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const currentLocation = useLocationStore(state => state.currentLocation);

  const {
    setRideDetails,
    rideData,
    savedPlaces,
    setSavedPlaces,
    updateStop,
    addStop,
    removeStop,
    setStops,
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
  const pickupSearch = useLocationSearch(pickupStop?.address ?? '');

  const destinationSearch = useLocationSearch(destinationStop?.address ?? '');

  const { t } = useTranslation('selectRide');

  const {
    data: savedPlacesData,
    isLoading: savedPlacesLoading,
    error: savedPlacesError,
    refetch: fetchSavedPlaces,
  } = useRideRepository.useSavedPlaces(isModalVisible);

  // --- Set current location as pickup initially ---
  useEffect(() => {
    const setPickupFromCurrentLocation = async () => {
      if (!currentLocation || pickupStop) {
        return;
      }

      const address = await LocationService.reverseGeocode(
        currentLocation.latitude,
        currentLocation.longitude,
      );

      setRideDetails({
        stops: [
          {
            address,
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            order: 0,
            stopType: 'PICKUP',
          },
        ],
      });
    };

    setPickupFromCurrentLocation();
  }, [currentLocation, pickupStop]);

  // store the saved places api response in zustand
  useEffect(() => {
    if (savedPlacesData) {
      setSavedPlaces(savedPlacesData);
    }
  }, [savedPlacesData, setSavedPlaces]);

  // --- Ride Data Handlers ---
  const setFromLocation = (value: string) => {
    updateStop(0, {
      address: value,
      latitude: pickupStop?.latitude ?? 0,
      longitude: pickupStop?.longitude ?? 0,
      order: 0,
      stopType: 'PICKUP',
    });
  };

  const setToLocation = (value: string) => {
    updateStop(1, {
      address: value,
      latitude: destinationStop?.latitude ?? 0,
      longitude: destinationStop?.longitude ?? 0,
      order: 1,
      stopType: 'DROP_OFF',
    });
  };

  const onSelectPickup = (place: GeocodeResult) => {
    pickupSearch.clearResults();

    updateStop(0, {
      address: place.address,
      latitude: place.latitude,
      longitude: place.longitude,
      order: 0,
      stopType: 'PICKUP',
    });
  };
  const onSelectDestination = (place: GeocodeResult) => {
    destinationSearch.clearResults();

    updateStop(1, {
      address: place.address,
      latitude: place.latitude,
      longitude: place.longitude,
      order: 1,
      stopType: 'DROP_OFF',
    });
  };

  const addaStop = (place: GeocodeResult) => {
    const index = rideData.stops ? rideData.stops.length - 2 : 1;
    addStop(
      {
        address: place.address,
        latitude: place.latitude,
        longitude: place.longitude,
        order: index,
        stopType: 'STOP',
      },
      index,
    );
  };

  const removeaStop = (order: number) => {
    removeStop(order);
  };

  const setSelectedPerson = (value: string) => {
    let boolValue;
    if (value === 'forMe') {
      boolValue = false;
    } else {
      boolValue = true;
    }
    setRideDetails({
      isForSomeoneElse: boolValue,
    });
  };

  const setSelectedTime = (value: string) => {
    setRideDetails({
      scheduledAt: value,
    });
  };

  const setContactPhone = (value: string) => {
    setRideDetails({
      passengerContactPhone: value,
    });
  };

  // --- Logic ---
  const validate = (): boolean => {
    const rawErrors = validateRideInputs(
      pickupStop?.address ?? '',
      destinationStop?.address ?? '',
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
  };

  const onAddPlacePress = () => {
    navigation.navigate('AddNewPlace');
  };

  const handleFlipModal = () => {
    if (!isModalVisible) {
      fetchSavedPlaces();
    }

    setIsModalVisible(!isModalVisible);
  };

  return {
    // UI State
    isNowDropdownOpen,
    isForMeDropdownOpen,
    errors,
    isModalVisible,

    // Ride Data
    fromLocation: pickupStop?.address ?? '',
    toLocation: destinationStop?.address ?? '',
    selectedPerson: rideData.isForSomeoneElse ? 'otherContact' : 'forMe',
    selectedTime: rideData.scheduledAt ?? 'now',
    contactPhone: rideData.passengerContactPhone ?? '',
    savedPlaces,
    savedPlacesLoading,
    savedPlacesError,

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
    onAddPlacePress,

    pickupResults: pickupSearch.results,
    destinationResults: destinationSearch.results,
    pickupSearching: pickupSearch.isSearching,
    destinationSearching: destinationSearch.isSearching,
    onSelectPickup,
    onSelectDestination,
    addaStop,
    removeaStop,
  };
}
