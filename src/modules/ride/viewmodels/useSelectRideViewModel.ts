import { RideValidationErrors } from '../types/ride.types';
import { validateRideInputs } from '../utils/selectRideValidation';
import { useRideStore } from '../store/useRideStore';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { rideApi } from '../services/rideApi';
import { useSelectRideState } from '../hooks/useSelectRideState';
import { useSavedPlaces } from '../hooks/useSavedPlaces';
import { useRideMapLocation } from '../hooks/useRideMapLocations';
import { useCurrentUser } from '../../../core/store/userStore';
import ContactService from '../../../core/services/ContactService';
import PermissionService from '../../../core/services/location/PermissionService';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes';

export function useSelectRideViewModel() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const { t } = useTranslation('selectRide');

  const {
    rideData,
    savedPlaces,
    setSavedPlaces,
    setRideDetails,
    setEstimate,
    setPickingLocation,
  } = useRideStore();

  const state = useSelectRideState(rideData);
  const user = useCurrentUser();

  const savedPlacesVM = useSavedPlaces(
    state.isModalVisible,
    state.setIsModalVisible,
    state.activeInput,
    state.setFromText,
    state.setToText,
    state.setPickupCoordinates,
    state.setDestinationCoordinates,
  );

  const handleBottomSheet = (visible: boolean) => {
    state.setIsSheetVisible(visible);
  };

  const { onSetOnMap, onConfirmLocation } = useRideMapLocation(
    state.activeInput,
    state.setFromText,
    state.setToText,
    handleBottomSheet,
  );

  const validate = (): boolean => {
    const rawErrors = validateRideInputs(state.fromText, state.toText);
    const translatedErrors: RideValidationErrors = {};
    Object.keys(rawErrors).forEach(key => {
      translatedErrors[key as keyof RideValidationErrors] = t(rawErrors[key]);
    });
    state.setErrors(translatedErrors);
    return Object.keys(rawErrors).length === 0;
  };

  const onAddPlacePress = () => {
    navigation.navigate('AddNewPlace');
  };

  const onNextPress = async () => {
    const stops = [
      {
        address: state.fromText,
        latitude: state.pickupCoordinates.latitude,
        longitude: state.pickupCoordinates.longitude,
        order: 0,
        stop_type: 'PICKUP' as const,
      },
      {
        address: state.toText,
        latitude: state.destinationCoordinates.latitude,
        longitude: state.destinationCoordinates.longitude,
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
            address: state.fromText,
            latitude: state.pickupCoordinates.latitude,
            longitude: state.pickupCoordinates.longitude,
            order: 0,
            stop_type: 'PICKUP',
          },
          {
            address: state.toText,
            latitude: state.destinationCoordinates.latitude,
            longitude: state.destinationCoordinates.longitude,
            order: 1,
            stop_type: 'DROP_OFF',
          },
        ],
        scheduled_at: state.selectedTime,
        is_for_someone_else: state.selectedPerson === 'forMe' ? false : true,
        passenger_contact_phone: state.contactPhone ?? user?.phone_number, // replace it later with the logged in phone number
      },
    );
    } catch (error) {
      console.log('Estimate Error:', error);
    }
    
    if(rideData.passenger_contact_phone){
      navigation.navigate('RideOtp', {phoneNumber: rideData.passenger_contact_phone});
    }
  }


  const handleFlipModal = () => {
    if (!state.isModalVisible) {
      savedPlacesVM.fetchSavedPlaces();
    }

    state.setIsModalVisible(!state.isModalVisible);
  };

  const onRideForChanged = async (option: string) => {
  if (option === 'otherContact') {
    const granted = await PermissionService.requestContactsPermission();

    if (!granted) {
      return;
    }

    const contact = await ContactService.pickContact();

    if (!contact) {
      return;
    }

    setRideDetails({
      ...rideData,
      is_for_someone_else: true,
      passenger_contact_phone: contact.phone
    });
    state.setContactPhone(contact.phone);
    state.setSelectedPerson(contact.name);
    return;
  }

  setRideDetails({
    ...rideData,
    is_for_someone_else: false,
    passenger_contact_phone: user?.phone_number
  });

};

  return {
    ...state,
    validate,
    handleFlipModal,
    handleBottomSheet,

    pickupResults: state.pickupSearch.results,
    destinationResults: state.destinationSearch.results,

    pickupSearching: state.pickupSearch.isSearching,
    destinationSearching: state.destinationSearch.isSearching,

    // savedPlaces,
    ...savedPlacesVM,

    onAddPlacePress,
    onNextPress,
    onPickupFocus: state.onPickupFocus,
    onDestinationFocus: state.onDestinationFocus,
    onSelectPickup: state.onSelectPickup,
    onSelectDestination: state.onSelectDestination,
    onSetOnMap: onSetOnMap,
    onConfirmLocation: onConfirmLocation,
    onRideForChanged
  };
}
