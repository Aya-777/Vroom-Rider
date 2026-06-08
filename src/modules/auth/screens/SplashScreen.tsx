// import React from 'react';
// import { Dimensions, StyleSheet, View } from 'react-native';
// import { Canvas, Path, Image, Text, useFont, useImage, Skia } from '@shopify/react-native-skia';
// import Animated, { useAnimatedStyle } from 'react-native-reanimated';
// import { useSplashAnimation } from '../hooks/useSplashAnimation';
// import { useSplashViewModel } from '../viewmodels/useSplashViewModel';

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// interface SplashScreenProps {
//   onAnimationEnd: () => void;
// }

// export default function SplashScreen({ onAnimationEnd }: SplashScreenProps) {
//   const { handleAnimationComplete } = useSplashViewModel(onAnimationEnd);

//   const {
//     roadProgress,
//     textOpacity,
//     textScale,
//     logoTranslateY,
//     logoScale,
//   } = useSplashAnimation(handleAnimationComplete);

//   // تحميل الخط والأصول البصرية
//   const loraFont = useFont(require('../../../assets/fonts/Lora-Bold.ttf'), 48);
//   const logoImage = useImage(require('../../../assets/images/logo.png'));

//   // بناء مسار الطريق
//   const roadPath = Skia.Path.Make();
//   roadPath.moveTo(SCREEN_WIDTH * 0.1, SCREEN_HEIGHT);
//   roadPath.cubicTo(
//     SCREEN_WIDTH * 0.3, SCREEN_HEIGHT * 0.7,
//     SCREEN_WIDTH * 0.4, SCREEN_HEIGHT * 0.4,
//     SCREEN_WIDTH * 0.5, SCREEN_HEIGHT * 0.25
//   );
//   roadPath.cubicTo(
//     SCREEN_WIDTH * 0.6, SCREEN_HEIGHT * 0.4,
//     SCREEN_WIDTH * 0.7, SCREEN_HEIGHT * 0.7,
//     SCREEN_WIDTH * 0.9, SCREEN_HEIGHT
//   );
//   roadPath.close();

//   // تحريك النص عبر Reanimated Wrapper Style
//   const animatedTextWrapperStyle = useAnimatedStyle(() => ({
//     opacity: textOpacity.value,
//     transform: [{ scale: textScale.value }],
//   }));

//   // تحريك شعار اللوجو عبر Reanimated Wrapper Style
//   const animatedLogoWrapperStyle = useAnimatedStyle(() => ({
//     opacity: logoScale.value,
//     transform: [
//       { translateY: logoTranslateY.value },
//       { scale: logoScale.value }
//     ],
//   }));

//   if (!loraFont || !logoImage) {
//     return <View style={styles.container} />;
//   }

//   // حساب أبعاد وموقع كلمة Vroom لتتوسط الشاشة
//   const textWidth = loraFont.getTextWidth('Vroom');
//   const textX = SCREEN_WIDTH / 2 - textWidth / 2;
//   const textY = SCREEN_HEIGHT * 0.25 + 50;

//   return (
//     <View style={styles.container}>
//       {/* الطبقة الأولى: الطريق */}
//       <View style={StyleSheet.absoluteFill}>
//         <Canvas style={styles.canvas}>
//           <Path
//             path={roadPath}
//             color="#A855F7" // اللون البنفسجي كمحدد افتراضي للهوية المظلمة الفخمة
//             style="fill"
//             end={roadProgress}
//           />
//         </Canvas>
//       </View>

//       {/* الطبقة الثانية: النص المتحرك بدقة */}
//       <Animated.View style={[StyleSheet.absoluteFill, animatedTextWrapperStyle]} pointerEvents="none">
//         <Canvas style={styles.canvas}>
//           <Text
//             x={textX}
//             y={textY}
//             text="Vroom"
//             font={loraFont}
//             color="#F8FAFC"
//           />
//         </Canvas>
//       </Animated.View>

//       {/* الطبقة الثالثة: قفزة الشعار (Pin) فوق الكلمة */}
//       <Animated.View style={[styles.logoLayer, animatedLogoWrapperStyle]}>
//         <Canvas style={styles.logoCanvas}>
//           <Image
//             image={logoImage}
//             x={0}
//             y={0}
//             width={120}
//             height={120}
//           />
//         </Canvas>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212', // Premium Dark Mode Background
//   },
//   canvas: {
//     flex: 1,
//   },
//   logoCanvas: {
//     width: 120,
//     height: 120,
//   },
//   logoLayer: {
//     position: 'absolute',
//     width: 120,
//     height: 120,
//     top: SCREEN_HEIGHT * 0.25 - 120,
//     left: SCREEN_WIDTH / 2 - 60,
//   },
// });

import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Canvas, Path, Image, Text, useFont, useImage, Skia } from '@shopify/react-native-skia';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSplashAnimation } from '../hooks/useSplashAnimation';
import { useSplashViewModel } from '../viewmodels/useSplashViewModel';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationEnd: () => void;
}

export default function SplashScreen({ onAnimationEnd }: SplashScreenProps) {
  const { handleAnimationComplete } = useSplashViewModel(onAnimationEnd);
  const [isReady, setIsReady] = useState(false);

  // 1. تحميل الخط والأصول البصرية
  const loraFont = useFont(require('../../../assets/fonts/Lora-Bold.ttf'), 48);
  const logoImage = useImage(require('../../../assets/images/logo.png'));

  const {
    roadProgress,
    textOpacity,
    textScale,
    logoTranslateY,
    logoScale,
  } = useSplashAnimation(handleAnimationComplete , isReady);

  // 2. مراقبة جاهزية الأصول قبل تفعيل الواجهة
  useEffect(() => {
    if (loraFont && logoImage) {
      // إعطاء مهلة صغيرة جداً لضمان استقرار الرندر
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loraFont, logoImage]);

  // بناء مسار الطريق
  const roadPath = Skia.Path.Make();
  roadPath.moveTo(SCREEN_WIDTH * 0.1, SCREEN_HEIGHT);
  roadPath.cubicTo(
    SCREEN_WIDTH * 0.3, SCREEN_HEIGHT * 0.7,
    SCREEN_WIDTH * 0.4, SCREEN_HEIGHT * 0.4,
    SCREEN_WIDTH * 0.5, SCREEN_HEIGHT * 0.25
  );
  roadPath.cubicTo(
    SCREEN_WIDTH * 0.6, SCREEN_HEIGHT * 0.4,
    SCREEN_WIDTH * 0.7, SCREEN_HEIGHT * 0.7,
    SCREEN_WIDTH * 0.9, SCREEN_HEIGHT
  );
  roadPath.close();

  // تحريك النص
  const animatedTextWrapperStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ scale: textScale.value }],
  }));

  // تحريك شعار اللوجو
  const animatedLogoWrapperStyle = useAnimatedStyle(() => ({
    opacity: logoScale.value,
    transform: [
      { translateY: logoTranslateY.value },
      { scale: logoScale.value }
    ],
  }));

  // في حال عدم الجاهزية، نضع مؤشر تحميل فخم متناسق مع الثيم المظلم بدلاً من الشاشة الرمادية الميتة
  if (!isReady || !loraFont || !logoImage) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#A855F7" />
      </View>
    );
  }

  // حساب أبعاد وموقع كلمة Vroom لتتوسط الشاشة
  const textWidth = loraFont.getTextWidth('Vroom');
  const textX = SCREEN_WIDTH / 2 - textWidth / 2;
  const textY = SCREEN_HEIGHT * 0.25 + 50;

  return (
    <View style={styles.container}>
      {/* الطبقة الأولى: الطريق */}
      <View style={StyleSheet.absoluteFill}>
        <Canvas style={styles.canvas}>
          <Path
            path={roadPath}
            color="#A855F7"
            style="fill"
            end={roadProgress}
          />
        </Canvas>
      </View>

      {/* الطبقة الثانية: النص المتحرك */}
      <Animated.View style={[StyleSheet.absoluteFill, animatedTextWrapperStyle]} pointerEvents="none">
        <Canvas style={styles.canvas}>
          <Text
            x={textX}
            y={textY}
            text="Vroom"
            font={loraFont}
            color="#F8FAFC"
          />
        </Canvas>
      </Animated.View>

      {/* الطبقة الثالثة: قفزة الشعار (Pin) فوق الكلمة */}
      <Animated.View style={[styles.logoLayer, animatedLogoWrapperStyle]}>
        <Canvas style={styles.logoCanvas}>
          <Image
            image={logoImage}
            x={0}
            y={0}
            width={120}
            height={120}
          />
        </Canvas>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Premium Dark Mode Background
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    flex: 1,
  },
  logoCanvas: {
    width: 120,
    height: 120,
  },
  logoLayer: {
    position: 'absolute',
    width: 120,
    height: 120,
    top: SCREEN_HEIGHT * 0.25 - 120,
    left: SCREEN_WIDTH / 2 - 60,
  },
});