import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/extraDetails.styles';

type Props = {
  onPress: () => void;
};

export default function NextButton({ onPress }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity style={styles.nextButton} onPress={onPress}>
      <Text style={styles.nextText}>Next</Text>
    </TouchableOpacity>
  );
}