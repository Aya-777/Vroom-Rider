import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './AuthStack';
import MainTabs from './MainTabs';

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