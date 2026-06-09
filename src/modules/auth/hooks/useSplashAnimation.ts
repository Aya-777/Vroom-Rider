import { useEffect } from 'react';
import { useSharedValue, withTiming, withSpring, Easing, runOnJS } from 'react-native-reanimated';

export const useSplashAnimation = (onAnimationComplete: () => void, isReady: boolean) => {

  const roadProgress = useSharedValue(0);

  const textOpacity = useSharedValue(0);
  const textScale = useSharedValue(0.8);

  const logoTranslateY = useSharedValue(-800);
  const logoScale = useSharedValue(0);

  useEffect(() => {
    if (!isReady) return;

    roadProgress.value = 0;
    textOpacity.value = 0;
    textScale.value = 0.8;
    logoTranslateY.value = -500;
    logoScale.value = 0;

    roadProgress.value = withTiming(1, {
      duration: 1000,
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    }, (roadFinished) => {
      if (roadFinished) {

        textOpacity.value = withTiming(1, { duration: 500 });
        textScale.value = withTiming(1, {
          duration: 500,
          easing: Easing.out(Easing.quad),
        });

        logoTranslateY.value = withSpring(0, {
          damping: 12,
          stiffness: 90,
        });
        logoScale.value = withSpring(1, {
          damping: 12,
          stiffness: 90,
        }, (logoFinished) => {
          if (logoFinished) {

            setTimeout(() => {
              runOnJS(onAnimationComplete)();
            }, 500);
          }
        });
      }
    });
  }, [isReady, onAnimationComplete, logoScale, logoTranslateY, roadProgress, textOpacity, textScale]);

  return {
    roadProgress,
    textOpacity,
    textScale,
    logoTranslateY,
    logoScale,
  };
};