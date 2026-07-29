import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes';
import { useRideRepository } from '../repositories/rideRepositories';
import { GeocodeResult } from '../../../core/services/location/GeoCodingService';
import { useLocationSearch } from '../hooks/useLocationSearch';

export function useAddNewPlaceViewModel() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const { mutate: createSavedPlace, isPending } =
    useRideRepository.useCreateSavedPlace();

  const [name, setName] = useState('');
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState('home');
  const [address, setAddress] = useState('');

  const {
    results: searchResults,
    isSearching,
    clearResults,
} = useLocationSearch(address);

  const selectAddress = (place: GeocodeResult) => {
    setAddress(place.address);

    setLat(place.latitude);
    setLng(place.longitude);

    clearResults();
};

  const setCoordinates = (latitude: number, longitude: number) => {
    setLat(latitude);
    setLng(longitude);
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onSave = () => {
  if (lat === 0 || lng === 0) {
    return;
  }

  createSavedPlace(
    {
      label: name.trim(),
      address: address.trim(),
      latitude: lat,
      longitude: lng,
      icon: selectedIcon,
    },
    {
      onSuccess: () => {
        navigation.goBack();
      },
      onError: (error) => {
        console.error('Failed to create saved place:', error);
      },
    },
  );
};

  return {
    name,
    address,
    lat,
    lng,
    selectedIcon,

    searchResults,
    isSearching,

    setName,
    setAddress,
    setSelectedIcon,
    setCoordinates,

    selectAddress,

    onBack,
    onSave,

    isPending,
  };
}
