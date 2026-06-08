import { useCallback } from 'react';

export const useSplashViewModel = (onAnimationComplete: () => void) => {
  // دالة بسيطة ومطابقة لمعايير React تقود لإطلاق الـ Callback الممرر من الـ Navigator
  const handleAnimationComplete = useCallback(() => {
    onAnimationComplete();
  }, [onAnimationComplete]);

  return {
    handleAnimationComplete,
  };
};