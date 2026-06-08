import { useNavigation } from '@react-navigation/native';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';
import { Alert } from 'react-native';


export function useSelectRide(fromLocation: string, toLocation: string) {
  
    const navigation =
      useNavigation<HomeStackScreenProps<'SelectRide'>['navigation']>();

    const handleNextPress = () => {
      if (!fromLocation.trim() || !toLocation.trim()) {
        Alert.alert(
          'Missing Information',
          'Please fill in both pickup and destination locations.',
        );
        return;
      }
  
      navigation.navigate('RideDetails', {
        pickupLocation: fromLocation,
        dropoffLocation: toLocation,
      });
    };

    const handleBackPress = () => {
      navigation.goBack();
    }

    return{
      handleNextPress,
      handleBackPress,
    }
  }