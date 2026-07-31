import { useAuthActions } from '../../../core/store/authStore';
import { useAuthRepository  } from '../../auth/repositories/authRepository';

export const useProfileActions = () => {
  const { logout } = useAuthActions();

  const logoutMutation = useAuthRepository.useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        logout();
      },

      onError: (err: any) => {
        if (
          err?.response?.status === 400 ||
          err?.response?.status === 401
        ) {
          logout();
          return;
        }

        console.error(err);
      },
    });
  };

  return {
    logout: handleLogout,
  };
};