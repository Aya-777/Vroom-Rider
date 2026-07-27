import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes';

export function useSavedPlacesViewModel() { 

  const navigation =
  useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  

  //setters
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('home');

  const onSave = (name: "string" ,address: "string", icon: any) => {

  }

  const onBack = () => {
    navigation.goBack();
  }

  const navigateToAddNewPlace = () => {
    navigation.navigate('AddNewPlace');
  }

  return{
    name,
    address,
    selectedIcon,

    setName,
    setAddress,
    setSelectedIcon,

    onBack,
    onSave,
    navigateToAddNewPlace
  }
}