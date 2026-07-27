import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes';
import { useRideRepository } from '../repositories/rideRepositories';

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
  const [selectedIcon, setSelectedIcon] = useState('home');

  const setCoordinates = (
    latitude:number,
    longitude:number
) => {
    setlat(latitude);
    setlng(longitude);
};

  const onBack = () => {
    navigation.goBack();
  };

  const onSave = () => {

  if(lat === 0 || lng === 0){
      return;
  }

  createSavedPlace({
      label:name,
      category:selectedIcon.toUpperCase(),
      address,
      latitude:lat,
      longitude:lng,
  },
  {
      onSuccess:()=>{
          navigation.goBack();
      }
  });

};

  return {
    name,
    address,
    selectedIcon,
    lng,
    lat,

    setName,
    setAddress,
    setSelectedIcon,
    setCoordinates,

    onBack,
    onSave,
  };
}
