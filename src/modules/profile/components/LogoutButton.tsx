import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/profile.styles';

import LogoutIcon from '../../../assets/svg/profile/logout.svg';

type Props = {
  onPress: () => void;
};

export default function LogoutButton({ onPress }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.logoutButton,
      ]}
    >
      <LogoutIcon fill={'red'} />

      <Text
        style={[
          styles.logoutText,
        ]}
      >
        Logout
      </Text>
    </TouchableOpacity>
  );
}