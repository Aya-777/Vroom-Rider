import React from 'react';

import {
  View,
  Text,
} from 'react-native';

import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/home.styles';

interface Props {
  title: string;
  icon?: React.ReactNode;
}

export default function SectionHeader({
  title,
  icon,
}: Props) {

  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.destinationHeader}>

      <View
        style={styles.forYouHeader}
      >
        {icon}

        <Text
          style={[
            styles.sectionTitle,
            { color: colors.textPrimary },
          ]}
        >
          {title}
        </Text>
      </View>

    </View>
  );
}