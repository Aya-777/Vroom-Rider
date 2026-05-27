import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { enableScreens, enableFreeze } from 'react-native-screens';

enableScreens(true);
enableFreeze(true);

function App() {
  return (
    <RootNavigator />
  );
}

export default App;