import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type HomeStackParamList = {
  HomeScreen: undefined;       
  SelectRide: undefined;
  
  RideDetails: { 
    pickupLocation: string; 
    dropoffLocation: string; 
  };
  
  ConfirmRide: { rideId: string }; 
  
  DriverFound: { rideId: string };
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = 
  NativeStackScreenProps<HomeStackParamList, T>;