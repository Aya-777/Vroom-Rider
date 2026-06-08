// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { navigationRef, RootStackParamList } from './rootTypes';

// import { useAuthLoggedIn } from '../core/store/authStore'; 
// import MainTabs from './main/MainTabs';
// import AuthStack from './auth/AuthStack';
// import { deepLinkingConfig } from './deepLinkingConfig';
// // import SplashScreen from '../features/auth/screens/SplashScreen';
// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function RootNavigator() {
//   const isLoggedIn = useAuthLoggedIn(); 

//   return (
//     <NavigationContainer 
//     linking={deepLinkingConfig}
//     ref={navigationRef}>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {isLoggedIn ? (
//           // Protected Routes (App Stack)
//           <Stack.Group>
//             <Stack.Screen
//               name="MainTabs"
//               component={MainTabs}
//             />
//           </Stack.Group>
//         ) : (
//           // Public Routes (Auth Stack)
//           <Stack.Group>
//             <Stack.Screen
//               name="AuthStack"
//               component={AuthStack}
//             />
//           </Stack.Group>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef, RootStackParamList } from './rootTypes';

import { useAuthLoggedIn } from '../core/store/authStore'; 
import MainTabs from './main/MainTabs';
import AuthStack from './auth/AuthStack';
import SplashScreen from '../modules/auth/screens/SplashScreen'; 
import { deepLinkingConfig } from './deepLinkingConfig';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const isLoggedIn = useAuthLoggedIn(); 
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  return (
    <NavigationContainer 
      linking={deepLinkingConfig}
      ref={navigationRef}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isSplashComplete ? (
          // شاشة السبلاش تظهر دائماً كأول شاشة عند فتح التطبيق
          <Stack.Screen name="Splash">
            {(props) => (
              <SplashScreen 
                {...props} 
                onAnimationEnd={() => setIsSplashComplete(true)} 
              />
            )}
          </Stack.Screen>
        ) : isLoggedIn ? (
          // بعد انتهاء الانيميشن: إذا كان مسجل دخول يتوجه للقائمة الرئيسية
          <Stack.Group>
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
            />
          </Stack.Group>
        ) : (
          // بعد انتهاء الانيميشن: إذا لم يكن مسجل دخول يتوجه للمصادقة
          <Stack.Group>
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}