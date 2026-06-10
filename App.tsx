/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { StatusBar, View ,Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider } from './src/core/theme/ThemeProvider';
import { useTheme } from './src/core/theme/useTheme';
import { enableScreens, enableFreeze } from 'react-native-screens';
import SplashScreen from './src/modules/auth/screens/SplashScreen';

enableScreens(true);
enableFreeze(true);

function AppContent() {
  const { colors } = useTheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setHidden(true, 'fade');
    }
  }, []);
  
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar hidden={true} animated={true} />
      <SplashScreen onAnimationEnd={function (): void {
        throw new Error('Function not implemented.');
      } } />
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
