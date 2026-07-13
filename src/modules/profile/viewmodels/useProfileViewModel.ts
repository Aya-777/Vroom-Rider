import {
  profileGridItems,
  profileListItems,
} from '../constants/profileData';
import { useMainDrawer } from '../../../navigation/hooks/useMainDrawer';

export const useProfileViewModel = () => {
  const { openSidebar } = useMainDrawer();

  return {
    openSidebar,
    gridItems: profileGridItems,
    listItems: profileListItems,
  };
};