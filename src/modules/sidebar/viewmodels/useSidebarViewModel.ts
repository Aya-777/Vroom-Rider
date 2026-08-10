import { DrawerContentComponentProps } from '@react-navigation/drawer';

import { SIDEBAR_ITEMS } from '../constants/sidebarItems';
import { SidebarItem } from '../types/sidebar.types';
import { useCurrentUser } from '../../../core/store/userStore';
import { useThemeMode, useThemeActions } from '../../../core/store/themeStore';
import { getFullImageUrl } from '../../../shared/utils/getImageUrl';
import { useState } from 'react';
import { useSavedPlaces } from '../../ride/hooks/useSavedPlaces';

type Navigation = DrawerContentComponentProps['navigation'];

export const useSidebarViewModel = (navigation: Navigation) => {
  const cachedUser = useCurrentUser();
  const mode = useThemeMode();
  const { toggleMode } = useThemeActions();
  const [isSavedPlacesOpen, setIsSavedPlacesOpen] = useState(false);

  const savedPlacesVM = useSavedPlaces(
    isSavedPlacesOpen,
    setIsSavedPlacesOpen,
  );

  const user = {
    name: cachedUser ? `${cachedUser.first_name} ${cachedUser.last_name}` : '',
    rating: cachedUser?.rating ?? 5.0,
    avatar: getFullImageUrl(cachedUser?.profile_image),
  };

  const handleItemPress = (item: SidebarItem) => {
    if (!item.route) {
      return;
    }
    if(item.route === 'SavedPlaces'){
      setIsSavedPlacesOpen(true);
      navigation.closeDrawer();
      return;
    }else if(item.route === 'FavoriteDrivers'){
      navigation.navigate('MainTabs', {
        screen: 'HomeTab',
        params: {
          screen: 'FavoriteDrivers',
        },
      });
      navigation.closeDrawer();
      return;
    }

    navigation.navigate('MainTabs', {
      screen: item.route,
    });

    navigation.closeDrawer();
  };

  const onAddPlace = () => {
    navigation.navigate('MainTabs', {
        screen: 'HomeTab',
        params: {
          screen: 'AddNewPlace',
        },
      });
      setIsSavedPlacesOpen(false);
    };

  return {
    user,
    items: SIDEBAR_ITEMS,
    version: '2.4.0',
    handleItemPress,
    mode,
    toggleTheme: toggleMode,
    ...savedPlacesVM,

    isSavedPlacesOpen,
    setIsSavedPlacesOpen,
    onAddPlace,
  };
};
