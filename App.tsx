import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';

import { ThemeProvider } from './src/core/theme/ThemeProvider';

import { enableScreens, enableFreeze } from 'react-native-screens';

enableScreens(true);
enableFreeze(true);

function App() {
  return (
    <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
  );
}

export default App;
