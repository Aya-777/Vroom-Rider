/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';

import { ThemeProvider } from './src/core/theme/ThemeProvider';
import { useTheme } from './src/core/theme/useTheme';

import { enableScreens, enableFreeze } from 'react-native-screens';
// import SignupScreen from './src/modules/auth/screens/SignupScreen';

enableScreens(true);
enableFreeze(true);

function AppContent() {
  const { colors, mode } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <RootNavigator />
    </View>
  );
}

function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
