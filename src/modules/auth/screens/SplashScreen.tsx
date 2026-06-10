import React, { useEffect, useState, useMemo } from 'react';
import { Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import { BlurMask, Canvas, Circle, Image, useFont, useImage } from '@shopify/react-native-skia';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSplashViewModel } from '../viewmodels/useSplashViewModel';
import { useSplashAnimation } from '../hooks/useSplashAnimation';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/Splash.styles';
import { SplashRoad } from '../components/splash/SplashRoad';
import { SplashText } from '../components/splash/SplashText';
import { generateRoadPaths } from '../utils/SplashPathUtils';
import LinearBg from '../../../shared/components/LinearBg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const LOGO_SIZE = 150;
const GLOW_SIZE = 260;
const PADDING = (GLOW_SIZE - LOGO_SIZE) / 2;
interface SplashScreenProps {
  onAnimationEnd: () => void;
}

export default function SplashScreen({ onAnimationEnd }: SplashScreenProps) {
  const { handleAnimationComplete } = useSplashViewModel(onAnimationEnd);
  const [isReady, setIsReady] = useState(false);

  const loraFont = useFont(require('../../../assets/fonts/Lora-Bold.ttf'), 56);
  const logoImage = useImage(require('../../../assets/images/logo.png'));

  const { colors } = useTheme();
  const styles = createStyles(colors);

  const {
    roadProgress, textOpacity, textScale, textProgress, logoTranslateY, logoScale,
  } = useSplashAnimation(handleAnimationComplete, isReady);

  useEffect(() => {
    if (loraFont && logoImage) {
      const timer = setTimeout(() => setIsReady(true), 150);
      return () => clearTimeout(timer);
    }
  }, [loraFont, logoImage]);

  const logoY = SCREEN_HEIGHT * 0.36 - LOGO_SIZE / 2;
  const logoCenterX = SCREEN_WIDTH / 2;
  const vanishingPointY = logoY + LOGO_SIZE * 0.7;
  const textY = SCREEN_HEIGHT * 0.20;

  const { roadPath, customDashPath } = useMemo(() => {
    return generateRoadPaths({
      screenWidth: SCREEN_WIDTH,
      screenHeight: SCREEN_HEIGHT + 50,
      logoCenterX,
      vanishingPointY,
      roadTopWidth: 33,
    });
  }, [logoCenterX, vanishingPointY]);

  const textChars = useMemo(() => {
    if (!loraFont) return [];
    const word = "VROOM";
    let currentX = SCREEN_WIDTH / 2 - loraFont.getTextWidth(word) / 2;
    return word.split('').map((char) => {
      const charX = currentX;
      currentX += loraFont.getTextWidth(char);
      return { char, x: charX };
    });
  }, [loraFont]);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoScale.value,
    transform: [{ translateY: logoTranslateY.value }, { scale: logoScale.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ scale: textScale.value }],
  }));

  if (!isReady || !loraFont || !logoImage) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={'#BFA4F5'} />
      </View>
    );
  }

  return (
    <LinearBg
      style={styles.container}
      colors={[colors.backgroundSoft, colors.background, colors.background]}>

      <View style={StyleSheet.absoluteFill}>
        <SplashRoad styles={styles} roadPath={roadPath} customDashPath={customDashPath} roadProgress={roadProgress} />
      </View>

      <Animated.View style={[StyleSheet.absoluteFill, animatedTextStyle]} pointerEvents="none">
        <Canvas style={styles.canvas}>
          <SplashText
            textChars={textChars}
            textY={textY}
            loraFont={loraFont}
            textProgress={textProgress}
            textColor={colors.primary}
          />
        </Canvas>
      </Animated.View>

      <Animated.View style={[styles.logoLayer, animatedLogoStyle]}>
        <Canvas style={{ width: GLOW_SIZE, height: GLOW_SIZE }}>
          <Circle
            cx={PADDING + LOGO_SIZE / 2}
            cy={PADDING + LOGO_SIZE / 2}
            r={40}
            color={colors.primary}
            opacity={0.5}
          >
            <BlurMask blur={40} style="normal" />
          </Circle>
          <Image
            image={logoImage}
            x={(GLOW_SIZE - LOGO_SIZE) / 2}
            y={(GLOW_SIZE - LOGO_SIZE) / 2}
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            fit="contain"
          />
        </Canvas>
      </Animated.View>
    </LinearBg>
  );
}