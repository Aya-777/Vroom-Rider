import RideIcon from '../../../assets/svg/common/ride.svg';
import ReserveIcon from '../../../assets/svg/home/reserve.svg';
import { useTranslation } from 'react-i18next';
import { recentDestinations } from '../constants/homeData';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

import {MainDrawerParamList} from '../../../navigation/main/mainTypes';

type MainDrawerNavigation =
  DrawerNavigationProp<MainDrawerParamList>;


export const useHomeViewModel = () => {
  const { t } = useTranslation(['common', 'home']);
  const navigation = useNavigation();

  const services = [
    {
      id: '1',
      title: t('ride'),
      icon: RideIcon,
      active: true,
    },

    {
      id: '2',
      title: t('home:services.reserve'),
      icon: ReserveIcon,
      active: false,
    },
  ];
const openSidebar = () => {
    const drawerNavigation =
      navigation.getParent<MainDrawerNavigation>('MainDrawer');

    drawerNavigation?.openDrawer();
  };

  return {
    services,
    recentDestinations,
    openSidebar,
  };
};
