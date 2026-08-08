import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFavoriteDriversStore } from '../store/useFavoriteDriversStore';

export const useFavoriteDriversViewModel = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const { drivers, searchQuery, setSearchQuery, setSelectedFilter, toggleFavorite, fetchFavoriteDrivers } =
    useFavoriteDriversStore();

  // Fetch favorite drivers once when the screen mounts
  useEffect(() => {
    fetchFavoriteDrivers();
  }, [fetchFavoriteDrivers]);

  const filteredDrivers = drivers.filter(driver => {
    const name = `${driver.first_name} ${driver.last_name}`;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const goBack = () => {
    navigation.goBack();
  };

  return {
    drivers: filteredDrivers, // Return filtered list for the FlatList
    searchQuery,
    setSearchQuery,
    goBack,
    toggleFavorite,
  };
};