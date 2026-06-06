/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuthActions } from '../../../core/store/authStore';
import type { AuthNavigationProp } from '../../../navigation/auth/authTypes';

export function useLoginViewModel() {
  const navigation = useNavigation<AuthNavigationProp>();
  const { login } = useAuthActions();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const mockToken = "your_received_jwt_token_here";

      login(mockToken);

    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return {
    handleLogin,
    isLoading,
    handleNavigateToSignup
  };
}