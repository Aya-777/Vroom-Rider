import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../modules/auth/screens/LoginScreen';
import HomeScreen from '../modules/home/screens/HomeScreen';
import ProfileScreen from '../modules/profile/screens/ProfileScreen';
import FromandWheretoScreen from '../modules/ride/screens/FromandWheretoScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="StartRide" component={FromandWheretoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;