import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import MainTabs from './MainTabs';
import SidebarScreen from '../../modules/sidebar/screens/SidebarScreen';

import { MainDrawerParamList } from './mainTypes';
import {I18nManager} from 'react-native';

const Drawer = createDrawerNavigator<MainDrawerParamList>();
const isRTL = I18nManager.isRTL;

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      id="MainDrawer"
      drawerContent={(props: DrawerContentComponentProps) => (
        <SidebarScreen {...props} />
      )}
      screenOptions={{
        headerShown: false,
        drawerPosition: isRTL ? 'right' : 'left',
        drawerType: 'front',  
        drawerStyle: {
          width: '75%',
        },
        overlayColor: 'rgba(0, 0, 0, 0.35)',
      }}>
      <Drawer.Screen
        name="MainTabs"
        component={MainTabs}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawer;