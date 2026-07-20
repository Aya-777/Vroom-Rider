import { useNavigation } from '@react-navigation/native';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';

export function useRideViewModel() {
  const navigation = useNavigation<HomeStackScreenProps<'SelectRide'>['navigation']>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return {
    handleBackPress,
  };
}