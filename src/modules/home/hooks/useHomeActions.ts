import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabsParamList } from '../../../navigation/main/mainTypes';

export const useHomeActions = () => {
  
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const tabNavigation = useNavigation<BottomTabNavigationProp<MainTabsParamList>>();
  
  const navigateToSelectRide = () => {
    navigation.navigate('SelectRide');
  };
  
  return { navigateToSelectRide };
};