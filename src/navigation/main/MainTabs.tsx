import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';

import { MainTabsParamList } from './mainTypes';

import { useTheme } from '../core/theme/useTheme';
import { Typography, Radius, Shadows } from '../core/theme/tokens';

// SVGs
import HomeIcon from '../assets/svg/home.svg';
import CarIcon from '../assets/svg/car.svg';
import ProfileIcon from '../assets/svg/profile.svg';
import HomeStack from './home/HomeStack';
import ProfileStack from './profile/ProfileStack';

// import { Typography } from '../../core/theme';
import { SvgProps } from 'react-native-svg';
import HomeActive from '../../assets/svg/home.svg';
import HomeInactive from '../../assets/svg/home.svg';
import CarActive from '../../assets/svg/car.svg';
import ProfileActive from '../../assets/svg/profile.svg';
import ProfileInactive from '../../assets/svg/profile.svg';

const Tab = createBottomTabNavigator<MainTabsParamList>();

const HIDE_TAB_ROUTES = [
  'SelectRide',
  'RideDetails',
  'ConfirmRide',
  'DriverFound',
];

/* ---------------- ICON ---------------- */

type IconProps = {
  routeName: string;
  color: string;
};

const TabIcon = ({ routeName, color }: IconProps) => {
  let Icon = HomeIcon;

  switch (routeName) {
    case 'HomeTab':
      Icon = HomeIcon;
      break;

    case 'ActivityTab':
      Icon = CarIcon;
      break;

    case 'ProfileTab':
      Icon = ProfileIcon;
      break;
  }

  return (
    <View style={styles.iconWrapper}>
      <View style={[styles.activeIndicator, { backgroundColor: color }]} />
      <Icon width={24} height={24} fill={color} />
    </View>
  );
const baseTabBarStyle: ViewStyle = {
  height: 80,
  backgroundColor: '#FFFFFF',
  borderTopWidth: 2,
  borderTopColor: '#EBEBEB',
};

export default function MainTabs() {
  const { colors } = useTheme();

  const BASE_TAB_STYLE = {
    height: 80,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...Shadows.small,
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        // Explicitly type the route object to catch typos in your logic
        const currentRoute = route as RouteProp<MainTabsParamList, keyof MainTabsParamList>;

        // 1. Extract the active inner screen name from whatever stack is currently open
        const routeName = getFocusedRouteNameFromRoute(currentRoute) ?? '';
        
        // 2. Global checklist of screens that should hide the tab bar completely
        const hideOnScreens = ['SelectRide', 'RideDetails', 'ConfirmRide', 'DriverFound'];
        const shouldHide = hideOnScreens.includes(routeName);
        const focusedRoute =
          getFocusedRouteNameFromRoute(route) ?? '';

        const shouldHideTab =
          HIDE_TAB_ROUTES.includes(focusedRoute);

        return {
          headerShown: false,

          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,

          tabBarStyle: shouldHideTab
            ? styles.hiddenTabBar
            : BASE_TAB_STYLE,

          tabBarLabelStyle: {
            ...Typography.caption,
            textTransform: 'none',
            marginBottom: 2,
          },

          tabBarIcon: ({ color }) => (
            <TabIcon routeName={route.name} color={color} />
          ),
          },

          // Custom icon renderer using local SVGs and the top active bar line
          tabBarIcon: ({ focused, color }) => {
            let Icon: React.FC<SvgProps> | null = null;

            // TypeScript now strictly validates these strings!
            if (currentRoute.name === 'HomeTab') {
              Icon = focused ? HomeActive : HomeInactive;
            } else if (currentRoute.name === 'ActivityTab') {
              Icon = focused ? CarActive : CarActive;
            } else if (currentRoute.name === 'ProfileTab') {
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
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ tabBarLabel: 'Home' }}
      />

      <Tab.Screen
        name="ActivityTab"
        component={HomeStack} 
        options={{
          tabBarLabel: 'Activity',
        }}
        component={HomeStack}
        options={{ tabBarLabel: 'Activity' }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  hiddenTabBar: {
    display: 'none',
  },

  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },

  activeIndicator: {
    position: 'absolute',
    top: -6,
    width: 60,
    height: 3,
    borderRadius: Radius.full,
  },
});