/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/profile.styles';

type Props = {
  title: string;
  Icon: React.ElementType;
  onPress?: () => void;
};

export default function GridCard({ title, Icon, onPress }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.gridCard}
    >
      <Icon width={30} height={30} fill={colors.primary} />
      <Text style={{ marginTop: 10, color: colors.textPrimary }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}