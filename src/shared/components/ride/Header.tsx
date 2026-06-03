import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';

import {
  Typography,
  Radius,
  Shadows,
  Spacing,
} from '../../../core/theme/tokens';

import { useTheme } from '../../../core/theme/useTheme';
import ArrowLeft from '../../../assets/svg/arrows/arrowLeft.svg';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
}

const STATUS_BAR_HEIGHT =
  Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 20;

export default function Header({ title, onBackPress }: HeaderProps) {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {onBackPress ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            activeOpacity={0.7}
          >
            <ArrowLeft fill={colors.primary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        <View style={styles.placeholder} />
      </View>
    </View>
  );
}

/* ---------------- DYNAMIC STYLES ---------------- */

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      paddingTop: STATUS_BAR_HEIGHT,
      paddingBottom: Spacing.sm,
      backgroundColor: colors.surface,
      ...Shadows.small,
    },

    header: {
      minHeight: 56,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.md,
    },

    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: Radius.full,
    },

    title: {
      flex: 1,
      textAlign: 'left',
      ...Typography.h3,
      color: colors.textPrimary,
    },

    placeholder: {
      width: 40,
      height: 40,
    },
  });