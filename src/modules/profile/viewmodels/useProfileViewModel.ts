import { useProfileActions } from '../hooks/useProfileActions';
import {
  profileGridItems,
  profileListItems,
} from '../constants/profileData';

export const useProfileViewModel = () => {
  const { logout } = useProfileActions();

  return {
    gridItems: profileGridItems,
    listItems: profileListItems,
    logout,
  };
};