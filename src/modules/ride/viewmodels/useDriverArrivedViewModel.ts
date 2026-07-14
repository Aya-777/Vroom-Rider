import { driverMock } from '../constants/driverData';
import { useNavigation } from '@react-navigation/native';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';

export function useDriverArrivedViewModel() {
  const navigation = useNavigation<HomeStackScreenProps<'DriverFound'>['navigation']>();

  const handleBackPress = () => {
    navigation.goBack();
  }

  const handleSubmit = () => {
    navigation.navigate('HomeScreen');
  }

  const handleCloseReviewModal = () => {
    navigation.navigate('HomeScreen');
  }

  return {
    driver: driverMock,
    handleBackPress,
    handleSubmit,
    handleCloseReviewModal,
  };
}