import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './auth/AuthStack';
import MainTabs from './main/MainTabs';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const isLoggedIn = true;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
        />
      ) : (
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
        />
      )}
    </Stack.Navigator>
  );
}