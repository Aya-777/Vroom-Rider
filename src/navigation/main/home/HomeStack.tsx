import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../../modules/home/screens/HomeScreen';
import RideDetailsScreen from '../../../modules/ride/screens/ExtraDetailsScreen';
import RideConfirmationScreen from '../../../modules/ride/screens/RideConfirmationScreen';
import DriverFoundScreen from '../../../modules/ride/screens/DriverFoundScreen';
import { HomeStackParamList } from './homeTypes';
import DriverArrivedScreen from '../../../modules/ride/screens/DriverArrivedScreen';
import TripStartedScreen from '../../../modules/ride/screens/TripStartedScreen';
import RideScreen from '../../../modules/ride/screens/RideScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false , }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />

      <Stack.Screen
        name="Ride"
        component={RideScreen}
      />


      <Stack.Screen
        name="RideDetails"
        component={RideDetailsScreen}
      />

      <Stack.Screen
        name="ConfirmRide"
        component={RideConfirmationScreen}
      />

      <Stack.Screen
        name="DriverFound"
        component={DriverFoundScreen}
      />

      <Stack.Screen
        name="TripStarted"
        component={TripStartedScreen}
      />

      <Stack.Screen
        name="DriverArrived"
        component={DriverArrivedScreen}
      />
    </Stack.Navigator>
  );
}