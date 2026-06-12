import React, { useEffect, useState } from 'react';

import { ThemeProvider } from './src/core/theme/ThemeProvider';
import { useTheme } from './src/core/theme/useTheme';
import { enableScreens, enableFreeze } from 'react-native-screens';
import RootNavigator from './src/navigation/RootNavigator';

import './src/core/i18n';
import { LanguageService } from './src/core/i18n/services/LanguageService';
import { Platform, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
      <RootNavigator/>
    </View>
  );
}

function App() {
  const [isReady, setIsReady] =
    useState(false);

  useEffect(() => {
    const initialize = async () => {
      await LanguageService.initializeLanguage();
      setIsReady(true);
    };

    initialize();
  }, []);
  
  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
