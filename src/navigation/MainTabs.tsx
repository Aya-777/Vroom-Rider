import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';

import { useTheme } from '../core/theme/useTheme';
import { Typography, Radius, Shadows } from '../core/theme/tokens';

// SVGs
import HomeIcon from '../assets/svg/home.svg';
import CarIcon from '../assets/svg/car.svg';
import ProfileIcon from '../assets/svg/profile.svg';

const Tab = createBottomTabNavigator();

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