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
import { useRideRepository } from '../repositories/rideRepositories';

export function useSelectRideViewModel() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const { mutateAsync: sendRideOtp } = useRideRepository.useEnterRideNumber();
  const { t } = useTranslation('selectRide');

  const {
    rideData,
    setRideDetails,
    setEstimate,
    rideOtpVerified,
    setRideOtpVerified,
    setRideState,
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

    state.onSelectSavedStop,
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

   const onUserChange = (value: string) => {
    state.setSelectedPerson(value);
    setRideOtpVerified(value === 'forMe' ? true : false);
  }

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
    // Pickup
    {
      address: state.fromText,
      latitude: state.pickupCoordinates.latitude,
      longitude: state.pickupCoordinates.longitude,
      order: 0,
      stop_type: 'PICKUP' as const,
    },

    // Intermediate stops
    ...state.draftStops.map((stop, index) => ({
      address: stop.address,
      latitude: stop.latitude ?? 0,
      longitude: stop.longitude ?? 0,
      order: index + 1,
      stop_type: 'STOP' as const,
    })),

    // Destination
    {
      address: state.toText,
      latitude: state.destinationCoordinates.latitude,
      longitude: state.destinationCoordinates.longitude,
      order: state.draftStops.length + 1,
      stop_type: 'DROP_OFF' as const,
    },
  ];

  try {
    const estimate = await rideApi.estimateInitial({
      stops,
    });


    setEstimate(estimate);

    setRideDetails({
      stops,
      scheduled_at: state.selectedTime,
      is_for_someone_else:
        state.selectedPerson === 'forMe' ? false : true,
      passenger_contact_phone:
        state.contactPhone ?? user?.phone_number,
    });
  } catch (error) {
    console.log('Estimate Error:', error);
  }

  if (
    state.selectedPerson !== 'forMe' && 
    state.contactPhone &&
    rideOtpVerified === false
  ) {

    const phoneNumber = state.contactPhone.replace(/\D/g, '');

    const localNumber = phoneNumber.startsWith('963')
      ? phoneNumber.substring(3)
      : phoneNumber;

    const finalPhoneNumber = '0' + localNumber;

    await sendRideOtp({
      phone_number: finalPhoneNumber,
    });

    navigation.navigate('RideOtp');
  }
};


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
    setSelectedPerson : onUserChange,
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
    onRideForChanged,

    rideOtpVerified,
    setRideOtpVerified,
    setRideState
  };
}
