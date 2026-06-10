import RideIcon from '../../../assets/svg/common/ride.svg';
import ReserveIcon from '../../../assets/svg/home/reserve.svg';

import { recentDestinations } from '../constants/homeData';

export const useHomeViewModel = () => {

  const services = [
    {
      id: '1',
      title: 'Ride',
      icon: RideIcon,
      active: true,
    },

    {
      id: '2',
      title: 'Reserve',
      icon: ReserveIcon,
      active: false,
    },
  ];

  return {
    services,
    recentDestinations,
  };
};