// import { useEffect } from 'react';
// import { useSharedValue, withTiming, withSpring, Easing, runOnJS } from 'react-native-reanimated';

// export const useSplashAnimation = (onAnimationComplete: () => void) => {
//   // تقدم رسم الطريق (من 0 إلى 1)
//   const roadProgress = useSharedValue(0);

//   // شفافية وحجم نص Vroom
//   const textOpacity = useSharedValue(0);
//   const textScale = useSharedValue(0.8);

//   // إحداثيات قفزة الشعار (يبدأ خارج الشاشة من أعلى ويستقر بالنط)
//   const logoTranslateY = useSharedValue(-500);
//   const logoScale = useSharedValue(0);

//   useEffect(() => {
//     // 1. رسم الطريق أولاً
//     roadProgress.value = withTiming(1, {
//       duration: 800,
//       easing: Easing.bezier(0.25, 1, 0.5, 1),
//     }, (roadFinished) => {
//       if (roadFinished) {
//         // 2. ظهور النص بانسيابية
//         textOpacity.value = withTiming(1, { duration: 400 });
//         textScale.value = withTiming(1, {
//           duration: 400,
//           easing: Easing.out(Easing.quad),
//         });

//         // 3. انطلاق قفزة الشعار واستقراره فوق الكلمة
//         logoTranslateY.value = withSpring(0, {
//           damping: 12,
//           stiffness: 90,
//         });
//         logoScale.value = withSpring(1, {
//           damping: 12,
//           stiffness: 90,
//         }, (logoFinished) => {
//           if (logoFinished) {
//             // الانتظار قليلاً ثم استدعاء التوجيه من الـ ViewModel عبر الـ JS Thread
//             runOnJS(onAnimationComplete)();
//           }
//         });
//       }
//     });
//   }, [onAnimationComplete, logoScale, logoTranslateY, roadProgress, textOpacity, textScale]);

//   return {
//     roadProgress,
//     textOpacity,
//     textScale,
//     logoTranslateY,
//     logoScale,
//   };
// };

import { useEffect } from 'react';
import { useSharedValue, withTiming, withSpring, Easing, runOnJS } from 'react-native-reanimated';

export const useSplashAnimation = (onAnimationComplete: () => void, isReady: boolean) => {
  // تقدم رسم الطريق (من 0 إلى 1)
  const roadProgress = useSharedValue(0);

  // شفافية وحجم نص Vroom
  const textOpacity = useSharedValue(0);
  const textScale = useSharedValue(0.8);

  // إحداثيات قفزة الشعار
  const logoTranslateY = useSharedValue(-500);
  const logoScale = useSharedValue(0);

  useEffect(() => {
    // 🛑 حرجة جداً: إذا لم تكن الأصول جاهزة، لا تبدأ الأنيميشن أبداً
    if (!isReady) return;

    // 1. إعادة تعيين القيم الافتراضية للتأكد من بدئها من الصفر أمام عين المستخدم
    roadProgress.value = 0;
    textOpacity.value = 0;
    textScale.value = 0.8;
    logoTranslateY.value = -500;
    logoScale.value = 0;

    // 2. انطلاق رسم الطريق أولاً
    roadProgress.value = withTiming(1, {
      duration: 1000, // زدنا المدة قليلاً لتستمتع بجمال الرسوميات الفخمة
      easing: Easing.bezier(0.25, 1, 0.5, 1),
    }, (roadFinished) => {
      if (roadFinished) {
        // 3. ظهور النص بانسيابية
        textOpacity.value = withTiming(1, { duration: 500 });
        textScale.value = withTiming(1, {
          duration: 500,
          easing: Easing.out(Easing.quad),
        });

        // 4. انطلاق قفزة الشعار واستقراره فوق الكلمة
        logoTranslateY.value = withSpring(0, {
          damping: 12,
          stiffness: 90,
        });
        logoScale.value = withSpring(1, {
          damping: 12,
          stiffness: 90,
        }, (logoFinished) => {
          if (logoFinished) {
            // الانتظار نصف ثانية بعد استقرار الشعار ليبهر العميل قبل النقل
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