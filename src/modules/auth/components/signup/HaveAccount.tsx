import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/signup.styles';

type Props = {
  onLoginPress?: () => void;
};

const SignupLoginFooter = ({ onLoginPress }: Props) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.footerContainer}>
      <View style={styles.linksRow}>
        <Text
          style={[
            styles.footerText,
            { color: colors.textMuted },
          ]}
        >
          Already have an account?{' '}
        </Text>

        <TouchableOpacity onPress={onLoginPress}>
          <Text
            style={[
              styles.footerLink,
              { color: colors.primary },
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupLoginFooter;