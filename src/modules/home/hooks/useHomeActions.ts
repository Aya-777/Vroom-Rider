import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes';
import { RecentDestinationParams } from '../../ride/types/recentDestination.types';

export const useHomeActions = () => {

  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const navigateToRide = () => {
    navigation.navigate('Ride');
  };

  const navigateToRideWithDestination = (destination: RecentDestinationParams) => {
    navigation.navigate('Ride', { prefillDestination: destination });
  };

  return { navigateToRide, navigateToRideWithDestination };
};