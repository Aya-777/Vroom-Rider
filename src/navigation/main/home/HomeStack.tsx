import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../../modules/home/screens/HomeScreen';
import { HomeStackParamList } from './homeTypes';
import RideScreen from '../../../modules/ride/screens/RideScreen';
import AddNewPlaceScreen from '../../../modules/ride/screens/AddNewPlaceScreen';
import RideOtpScreen from '../../../modules/ride/screens/RideOtpScreen';
import { FavoriteDriversScreen } from '../../../modules/favoriteDrivers/screens/FavoriteDriversScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Ride" component={RideScreen} />
      <Stack.Screen name="RideOtp" component={RideOtpScreen} />
      <Stack.Screen name="AddNewPlace" component={AddNewPlaceScreen} />
      <Stack.Screen name="FavoriteDrivers" component={FavoriteDriversScreen} />
    </Stack.Navigator>
  );
}
