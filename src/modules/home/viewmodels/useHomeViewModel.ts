import React from 'react';

import RideIcon from '../../../assets/svg/common/ride.svg';
import ReserveIcon from '../../../assets/svg/home/reserve.svg';

import { useTheme } from '../../../core/theme/useTheme';

import { recentDestinations } from '../constants/homeData';
import { useHomeActions } from '../hooks/useHomeActions';

export const useHomeViewModel = () => {

  const { colors } = useTheme();

  const {
    navigateToSelectRide,
  } = useHomeActions();

  const services = [
    {
      id: '1',
      title: 'Ride',
      icon: React.createElement(RideIcon, { fill: colors.textSecondary }),
      active: true,
      onPress: navigateToSelectRide,
    },

    {
      id: '2',
      title: 'Reserve',
      icon: React.createElement(ReserveIcon, { fill: colors.textMuted }),
    },
  ];

  return {
    services,
    recentDestinations,
  };
};