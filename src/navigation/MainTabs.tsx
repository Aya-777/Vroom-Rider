import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';

import { Shadows, Typography } from '../core/theme';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { SvgProps } from 'react-native-svg';
import HomeActive from '../assets/svg/home.svg';
import HomeInactive from '../assets/svg/home.svg';
import CarActive from '../assets/svg/car.svg';
import ProfileActive from '../assets/svg/profile.svg';
import ProfileInactive from '../assets/svg/profile.svg';

const Tab = createBottomTabNavigator();

const baseTabBarStyle = {
  height: 80,
  backgroundColor: '#FFFFFF',
  borderTopWidth: 2,
  borderTopColor: '#EBEBEB',
};

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        // 1. Extract the active screen name from whatever stack is currently open
        const routeName = getFocusedRouteNameFromRoute(route) ?? '';
        
        // 2. Global checklist of screens that should hide the tab bar completely
        const hideOnScreens = ['SelectRide', 'RideDetails', 'ConfirmRide', 'DriverFound'];
        const shouldHide = hideOnScreens.includes(routeName);

        return {
          headerShown: false,
          tabBarActiveTintColor: '#0F1E52',
          tabBarInactiveTintColor: '#A0A4AB',

          // 3. Set the layout style globally based on the screen visibility checklist
          tabBarStyle: shouldHide ? { display: 'none' } : baseTabBarStyle,

          tabBarLabelStyle: {
            ...Typography.caption,
            marginBottom: 0,
            textTransform: 'none',
          },

          // Custom icon renderer using local SVGs and the top active bar line
          tabBarIcon: ({ focused, color }) => {
            let Icon: React.FC<SvgProps> | null = null;

            if (route.name === 'HomeTab') {
              Icon = focused ? HomeActive : HomeInactive;
            } else if (route.name === 'ActivityTab') {
              Icon = focused ? CarActive : CarActive;
            } else if (route.name === 'ProfileTab') {
              Icon = focused ? ProfileActive : ProfileInactive;
            }

            return (
              <View style={styles.iconContainer}>
                {focused && <View style={styles.activeLine} />}
                {Icon ? (
                  <Icon 
                    width={24} 
                    height={24} 
                    style={styles.tabIcon} 
                    fill={color} 
                  />
                ) : null}
              </View>
            );
          },
        };
      }}
    >
      {/* Screens are now super clean and don't need independent tabBarStyle toggles */}
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="ActivityTab"
        component={HomeStack} // Swap out with your real ActivityStack component when ready
        options={{
          tabBarLabel: 'Activity',
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          tabBarLabel: 'PROFILE',
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  activeLine: {
    position: 'absolute',
    top: -5,
    width: 70,
    height: 3,
    backgroundColor: '#0F1E52',
    borderRadius: 1.5,
  },
  tabIcon: {
    width: 26,
    height: 26,
    marginTop: 12,
  },
});