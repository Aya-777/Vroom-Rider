import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { RecentDestinationParams } from '../../../modules/ride/types/recentDestination.types';

export type HomeStackParamList = {
  HomeScreen: undefined;
  Ride: { prefillDestination?: RecentDestinationParams; destinationText?: string } | undefined;
  RideOtp: undefined;
  AddNewPlace: undefined;
  FavoriteDrivers: undefined;
  Wallet: undefined;
  TopUp: undefined;
  Transactions: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;

export type HomeStackNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;
