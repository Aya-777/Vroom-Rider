import HistoryIcon from '../../../assets/svg/common/history.svg';
import SavedIcon from '../../../assets/svg/common/star.svg';
import CardIcon from '../../../assets/svg/payment/creditcard.svg';
import SettingsIcon from '../../../assets/svg/profile/settings.svg';
import HelpIcon from '../../../assets/svg/profile/help.svg';
import InfoIcon from '../../../assets/svg/common/info.svg';
import HeartIcon from '../../../assets/svg/common/favorite.svg'

import {SidebarItem} from '../types/sidebar.types';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 'savedPlaces',
    label: 'savedPlaces',
    icon: SavedIcon,
    route: 'SavedPlaces',
  },
  {
    id: 'favoriteDrivers',
    label: 'favoriteDrivers',
    icon: HeartIcon,
    route: 'FavoriteDrivers',
  },
  {
    id: 'wallet',
    label: 'wallet',
    icon: CardIcon,
    // route: 'Card',
  },
  {
    id: 'settings',
    label: 'settings',
    icon: SettingsIcon,
    // route: 'Settings',
  },
  {
    id: 'help',
    label: 'help',
    icon: HelpIcon,
    // route: 'Help',
  },
  {
    id: 'about',
    label: 'about',
    icon: InfoIcon,
    // route: 'About',
  },
];