import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RecentDestinationParams } from '../../../modules/ride/types/recentDestination.types';
import { RideState } from '../../../modules/ride/types/RideState';

export type HomeStackParamList = {
  HomeScreen: undefined;
  Ride: { prefillDestination?: RecentDestinationParams} | undefined;
  RideOtp: undefined;
  AddNewPlace: undefined;
  FavoriteDrivers: undefined
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;