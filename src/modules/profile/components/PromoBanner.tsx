import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/profile.styles';

export default function PromoBanner() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View
      style={[
        styles.promoBanner,
        { borderColor: colors.primary },
      ]}
    >
      <Text
        style={[
          styles.promoTitle,
          { color: colors.textPrimary },
        ]}
      >
        Become a Driver
      </Text>

      <Text
        style={[
          styles.promoSubtitle,
          { color: colors.textMuted },
        ]}
      >
        Earn on your own schedule
      </Text>

      <Text
        style={[
          styles.promoLink,
          { color: colors.primary },
        ]}
      >
        Learn more
      </Text>
    </View>
  );
}