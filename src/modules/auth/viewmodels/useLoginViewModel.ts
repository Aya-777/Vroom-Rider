import { useState } from 'react';
import { useAuthActions } from '../authStore';

export function useLoginViewModel() {
  const { login } = useAuthActions(); 
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // 1. Fire your actual API request here
      // const response = await loginApi(email, password);
      const mockToken = "your_received_jwt_token_here";

      login(mockToken); 
      
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    handleLogin, 
    isLoading 
  };
}