import React from 'react';

import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/home.styles';

interface Props {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
  onPress?: () => void;
}

export default function ServiceCard({
  title,
  icon,
  active,
  onPress,
}: Props) {

  const { colors } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={styles.gridItemContainer}>

      <TouchableOpacity
        style={[
          styles.gridItem,
          {
            backgroundColor: active
              ? colors.backgroundSoft
              : colors.border,
          },
          active && styles.activeGridItem,
        ]}
        onPress={onPress}
      >
        {icon}
      </TouchableOpacity>

      <Text
        style={[
          styles.gridLabel,
          { color: colors.textSecondary },
        ]}
      >
        {title}
      </Text>

    </View>
  );
}