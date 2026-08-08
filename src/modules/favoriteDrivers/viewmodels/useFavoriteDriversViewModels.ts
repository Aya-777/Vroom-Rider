import { useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFavoriteDriversStore } from '../store/useFavoriteDriversStore';

export const useFavoriteDriversViewModel = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const { drivers, searchQuery, setSearchQuery, setSelectedFilter, toggleFavorite } =
    useFavoriteDriversStore();

  const filteredDrivers = drivers.filter(
    driver =>
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.plate.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const goBack = () => {
    navigation.goBack();
  };

  return {
    filteredDrivers,
    searchQuery,
    setSearchQuery,
    goBack,
    toggleFavorite,
  };
};
