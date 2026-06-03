import React, { useEffect, useState } from 'react';
import RootNavigator from './src/navigation/RootNavigator';

import { ThemeProvider } from './src/core/theme/ThemeProvider';

import { enableScreens, enableFreeze } from 'react-native-screens';

import './src/core/i18n';
import { LanguageService } from './src/core/i18n/services/LanguageService';

enableScreens(true);
enableFreeze(true);

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
    <ThemeProvider >
      <RootNavigator />
    </ThemeProvider>
  );
}

export default App;
