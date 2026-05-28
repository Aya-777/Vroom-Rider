import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/selectRide.styles';
import ArrowIcon from '../../../assets/svg/arrows/arrow.svg';

type Props = {
  onPress: () => void;
};

export default function RideNextButton({
  onPress,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity
      style={styles.nextButton}
      onPress={onPress}
    >
      <Text style={styles.nextButtonText}>
        Next
      </Text>

      <ArrowIcon fill={colors.background} />
    </TouchableOpacity>
  );
}