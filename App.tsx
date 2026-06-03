import React from 'react';
// import RootNavigator from './src/navigation/RootNavigator';

import { ThemeProvider } from './src/core/theme/ThemeProvider';

import { enableScreens, enableFreeze } from 'react-native-screens';
import SignupScreen from './src/modules/auth/screens/SignupScreen';

enableScreens(true);
enableFreeze(true);

function App() {
  return (
    <ThemeProvider >
      <SignupScreen />
    </ThemeProvider>
  );
}

export default App;
