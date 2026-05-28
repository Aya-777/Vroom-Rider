import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/home.styles';

interface Props {
  title: string;
  actionText?: string;
  onPress?: () => void;
}

export default function SectionHeader({
  title,
  actionText,
  onPress,
}: Props) {

  const { colors } = useTheme();

  const styles = createStyles();

  return (
    <View style={styles.destinationHeader}>

      <Text
        style={[
          styles.sectionTitle,
          { color: colors.textPrimary },
        ]}
      >
        {title}
      </Text>

      {actionText && (
        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: colors.primary }}>
            {actionText}
          </Text>
        </TouchableOpacity>
      )}

    </View>
  );
}