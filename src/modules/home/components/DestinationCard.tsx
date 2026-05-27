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
  subtitle: string;
  icon: React.ReactNode;
}

export default function DestinationCard({
  title,
  subtitle,
  icon,
}: Props) {

  const { colors } = useTheme();

  const styles = createStyles();

  return (
    <TouchableOpacity
      style={[
        styles.destinationCard,
        { backgroundColor: colors.surface },
      ]}
    >

      <View
        style={[
          styles.destIconContainer,
          { backgroundColor: colors.primary },
        ]}
      >
        {icon}
      </View>

      <View style={styles.destTextContainer}>

        <Text
          style={[
            styles.destTitle,
            { color: colors.textPrimary },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.destSubtitle,
            { color: colors.textSecondary },
          ]}
        >
          {subtitle}
        </Text>

      </View>

    </TouchableOpacity>
  );
}