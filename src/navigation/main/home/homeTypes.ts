import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RecentDestinationParams } from '../../../modules/ride/types/recentDestination.types';

export type HomeStackParamList = {
  HomeScreen: undefined;
  Ride: { prefillDestination?: RecentDestinationParams } | undefined;
  RideOtp: {
    phoneNumber: string;
  }
  AddNewPlace: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;