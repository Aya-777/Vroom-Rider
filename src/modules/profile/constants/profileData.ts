import React from 'react';
import HistoryIcon from '../../../assets/svg/common/history.svg';
import NotificationsIcon from '../../../assets/svg/common/notifications.svg';
import StarIcon from '../../../assets/svg/common/star.svg';

import SettingsIcon from '../../../assets/svg/profile/settings.svg';
import { useTranslation } from 'react-i18next';

export const useProfileMenuItems = () => {
  const { t } = useTranslation('profile');

  const gridItems = [
    { id: '1', title: t('rideHistory'), icon: HistoryIcon },
    { id: '2', title: t('notifications'), icon: NotificationsIcon },
    { id: '3', title: t('favoriteDrivers'), icon: StarIcon },
    { id: '4', title: t('settings'), icon: SettingsIcon },
  ];

  const listItems: { id: string; title: string; icon: React.ElementType }[] = [];

  return { gridItems, listItems };
};


