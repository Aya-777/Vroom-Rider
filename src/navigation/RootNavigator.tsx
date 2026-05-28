import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef, RootStackParamList } from './rootTypes';

import { useAuthLoggedIn } from '../core/store/authStore'; 
import MainTabs from './main/MainTabs';
import AuthStack from './auth/AuthStack';
import { deepLinkingConfig } from './deepLinkingConfig';
// import SplashScreen from '../features/auth/screens/SplashScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const isLoggedIn = useAuthLoggedIn(); 

  return (
    <NavigationContainer 
    linking={deepLinkingConfig}
    ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          // Protected Routes (App Stack)
          <Stack.Group>
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
            />
          </Stack.Group>
        ) : (
          // Public Routes (Auth Stack)
          <Stack.Group>
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}