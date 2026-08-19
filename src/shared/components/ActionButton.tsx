import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { useTheme } from '../../core/theme/useTheme';
import { createStyles } from '../../modules/ride/styles/shared.styles';

type Props = {
  onPress: () => void;
  title: string;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
};

export default function ActionButton({
  onPress,
  title,
  icon,
  style,
  textStyle,
  disabled = false,
  loading = false,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.actionButton, style, isDisabled && { opacity: 0.5 }]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={colors.background} />
      ) : (
        <>
          <Text style={[styles.actionButtonText, textStyle]}>{title}</Text>
          {icon && icon}
        </>
      )}
    </TouchableOpacity>
  );
}