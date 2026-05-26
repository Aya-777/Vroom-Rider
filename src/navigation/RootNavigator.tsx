import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthLoggedIn } from '../modules/auth/authStore'; 
import MainTabs from './main/MainTabs';
import AuthStack from './auth/AuthStack';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const isLoggedIn = useAuthLoggedIn(); 

  return (
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
          <Stack.Group>
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
  );
}
