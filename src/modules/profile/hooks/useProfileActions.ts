import { useAuthActions } from '../../auth/authStore';

export const useProfileActions = () => {
  const { logout } = useAuthActions();

  return {
    logout,
  };
};