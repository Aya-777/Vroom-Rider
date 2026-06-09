import React, { useEffect, useState, useMemo } from 'react';
import { Dimensions, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Canvas, Path, Image, Text, useFont, useImage, Skia } from '@shopify/react-native-skia';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSplashViewModel } from '../viewmodels/useSplashViewModel';
import { useSplashAnimation } from '../hooks/useSplashAnimation';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/Splash.styles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const LOGO_SIZE = 150;

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

  useEffect(() => {
    if (loraFont && logoImage) {
      const timer = setTimeout(() => setIsReady(true), 150);
      return () => clearTimeout(timer);
    }
  }, [loraFont, logoImage]);

  const {
    roadProgress,
    textOpacity,
    textScale,
    logoTranslateY,
    logoScale,
  } = useSplashAnimation(handleAnimationComplete, isReady);

  const logoY = SCREEN_HEIGHT * 0.35 - LOGO_SIZE / 2;
  const logoCenterX = SCREEN_WIDTH / 2;

  const vanishingPointY = logoY + LOGO_SIZE * 0.7; 
  const roadTopWidth = 35;

  const roadPath = useMemo(() => {
    const path = Skia.Path.Make();

    path.moveTo(-120, SCREEN_HEIGHT);
    path.lineTo(SCREEN_WIDTH + 100, SCREEN_HEIGHT);

    path.cubicTo(
      SCREEN_WIDTH * 0.85, SCREEN_HEIGHT * 0.85,
      SCREEN_WIDTH * 0.55, SCREEN_HEIGHT * 0.72, 
      logoCenterX + roadTopWidth / 2, vanishingPointY
    );

    path.lineTo(logoCenterX - roadTopWidth / 2, vanishingPointY);

    path.cubicTo(
      SCREEN_WIDTH * 0.45, SCREEN_HEIGHT * 0.72,
      SCREEN_WIDTH * 0.15, SCREEN_HEIGHT * 0.85,
      -120, SCREEN_HEIGHT
    );
    path.close();
    return path;
  }, [logoCenterX, vanishingPointY]);

  const customDashPath = useMemo(() => {
    const path = Skia.Path.Make();

    const getCenterBezierPoint = (ratio: number) => {
      const p0 = { x: logoCenterX, y: SCREEN_HEIGHT };
      const p1 = { x: logoCenterX - 15, y: SCREEN_HEIGHT * 0.82 };
      const p2 = { x: logoCenterX - 5, y: SCREEN_HEIGHT * 0.70 }; 
      const p3 = { x: logoCenterX, y: vanishingPointY };

      const cx = 3 * (p1.x - p0.x);
      const bx = 3 * (p2.x - p1.x) - cx;
      const ax = p3.x - p0.x - cx - bx;

      const cy = 3 * (p1.y - p0.y);
      const by = 3 * (p2.y - p1.y) - cy;
      const ay = p3.y - p0.y - cy - by;

      const x = ax * Math.pow(ratio, 3) + bx * Math.pow(ratio, 2) + cx * ratio + p0.x;
      const y = ay * Math.pow(ratio, 3) + by * Math.pow(ratio, 2) + cy * ratio + p0.y;
      return { x, y };
    };

    let val = 0.05;
    while (val < 0.94) {
      const dashLength = 0.05 * Math.pow(1 - val, 2) + 0.005;

      const startPt = getCenterBezierPoint(val);
      const endPt = getCenterBezierPoint(Math.min(val + dashLength, 0.96));

      path.moveTo(startPt.x, startPt.y);
      path.lineTo(endPt.x, endPt.y);

      val += dashLength + (0.06 * Math.pow(1 - val, 1.8) + 0.015);
    }
    return path;
  }, [logoCenterX, vanishingPointY]);

  const animatedLogoWrapperStyle = useAnimatedStyle(() => ({
    opacity: logoScale.value,
    transform: [
      { translateY: logoTranslateY.value },
      { scale: logoScale.value }
    ],
  }));

  const animatedTextWrapperStyle = useAnimatedStyle(() => ({
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

  const textWidth = loraFont.getTextWidth('Vroom');
  const textX = SCREEN_WIDTH / 2 - textWidth / 2;
  const textY = SCREEN_HEIGHT * 0.85;

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        <Canvas style={styles.canvas}>
          <Path
            path={roadPath}
            color="#121F3F"
            style="fill"
            opacity={0.95}
          />

          <Path
            path={roadPath}
            color='#BFA4F5'
            style="stroke"
            strokeWidth={3}
            end={roadProgress}
          />

          <Path
            path={customDashPath}
            color='#BFA4F5'
            style="stroke"
            strokeWidth={4.5}
            strokeCap="round"
            end={roadProgress}
            opacity={0.8}
          />
        </Canvas>
      </View>

      <Animated.View style={[StyleSheet.absoluteFill, animatedTextWrapperStyle]} pointerEvents="none">
        <Canvas style={styles.canvas}>
          <Text
            x={textX}
            y={textY}
            text="Vroom"
            font={loraFont}
            color='#BFA4F5'
          />
        </Canvas>
      </Animated.View>

      <Animated.View style={[styles.logoLayer, animatedLogoWrapperStyle]}>
        <Canvas style={{ width: LOGO_SIZE, height: LOGO_SIZE }}>
          <Image
            image={logoImage}
            x={0}
            y={0}
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            fit="contain"
          />
        </Canvas>
      </Animated.View>
    </View>
  );
}