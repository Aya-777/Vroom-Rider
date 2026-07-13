import {SIDEBAR_ITEMS} from '../constants/sidebarItems';
import {SidebarItem} from '../types/sidebar.types';

export const useSidebarViewModel = () => {
  // Later, get this from your authStore/user store.
  const user = {
    name: 'John Doe',
    rating: 4.9,
    avatar: undefined,
  };

  const handleItemPress = (item: SidebarItem) => {
    if (!item.route) {
      return;
    }

    // Navigation will be connected here.
    console.log('Navigate to:', item.route);
  };

  return {
    user,
    items: SIDEBAR_ITEMS,
    version: '2.4.0',
    handleItemPress,
  };
};