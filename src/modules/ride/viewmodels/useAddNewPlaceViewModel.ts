import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes';
import { useRideRepository } from '../repositories/rideRepositories';
import {
  GeocodeResult,
  searchAddress,
} from '../../../core/services/location/GeoCodingService';
import { useDebounce } from '../hooks/useDebounce';

export function useAddNewPlaceViewModel() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const { mutate: createSavedPlace, isPending } =
    useRideRepository.useCreateSavedPlace();

  //setters
  const [name, setName] = useState('');
  const [lng, setlng] = useState(0);
  const [lat, setlat] = useState(0);
  const [address, setAddress] = useState('');
  const [searchResults, setSearchResults] = useState<GeocodeResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState('home');

  const debouncedAddress = useDebounce(address, 500);
  useEffect(() => {
  if (debouncedAddress.length < 3) {
    setSearchResults([]);
    return;
  }

  searchAddress(debouncedAddress)
    .then(results => {
      setSearchResults(results);
    });

}, [debouncedAddress]);

  const setCoordinates = (latitude: number, longitude: number) => {
    setlat(latitude);
    setlng(longitude);
  };

  const handleAddressSearch = async (text: string) => {
    setAddress(text);

    if (text.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    const results = await searchAddress(text);

    setSearchResults(results);

    setIsSearching(false);
  };

  const selectAddress = (place: GeocodeResult) => {
    setAddress(place.address);

    setlat(place.latitude);
    setlng(place.longitude);

    setSearchResults([]);
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
        label: name,
        category: selectedIcon.toUpperCase(),
        address,
        latitude: lat,
        longitude: lng,
      },
      {
        onSuccess: () => {
          navigation.goBack();
        },
      },
    );
  };

  return {
    name,
    address,
    selectedIcon,
    lng,
    lat,
    searchResults,
    selectAddress,
    isSearching,

    setName,
    setAddress,
    setSelectedIcon,
    setCoordinates,

    onBack,
    onSave,
  };
}
