import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';

import { useTheme } from '../../../../core/theme/useTheme';

import { createStyles } from '../../styles/selectRide.styles';

type Props = {
  icon: React.ReactNode;
  title: string;
};

export default function RideActionButton({
  icon,
  title,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity style={styles.actionButton}>
      {icon}

      <Text
        style={[
          styles.actionButtonText,
          { color: colors.textSecondary },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}