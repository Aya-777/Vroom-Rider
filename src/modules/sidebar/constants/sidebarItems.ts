import HistoryIcon from '../../../assets/svg/common/history.svg';
import SavedIcon from '../../../assets/svg/common/star.svg';
import WalletIcon from '../../../assets/svg/payment/creditcard.svg';
import SettingsIcon from '../../../assets/svg/profile/settings.svg';
import HelpIcon from '../../../assets/svg/profile/help.svg';
import InfoIcon from '../../../assets/svg/common/info.svg';

import {SidebarItem} from '../types/sidebar.types';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 'trips',
    label: 'My Trips',
    icon: HistoryIcon,
    route: 'ActivityTab',
  },
  {
    id: 'savedPlaces',
    label: 'Saved Places',
    icon: SavedIcon,
    // route: 'SavedPlaces',
  },
  {
    id: 'wallet',
    label: 'Wallet',
    icon: WalletIcon,
    // route: 'Wallet',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: SettingsIcon,
    // route: 'Settings',
  },
  {
    id: 'help',
    label: 'Help',
    icon: HelpIcon,
    // route: 'Help',
  },
  {
    id: 'about',
    label: 'About',
    icon: InfoIcon,
    // route: 'About',
  },
];