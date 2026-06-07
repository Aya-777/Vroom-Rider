import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/confirmRide.styles';

import SearchIcon from '../../../../assets/svg/common/search.svg';

type Props = {
  onPress: () => void;
};

export default function FindDriverButton({
  onPress,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>
        Find a Driver
      </Text>

      <SearchIcon
        width={18}
        height={18}
        fill={colors.background}
      />
    </TouchableOpacity>
  );
}