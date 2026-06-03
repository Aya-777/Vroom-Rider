import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/signup.styles';

const SignupFooter = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.footerContainer}>
      <Text
        style={[
          styles.footerText,
          { color: colors.textMuted },
        ]}
      >
        By continuing, you agree to Vroom's
      </Text>

      <View style={styles.linksRow}>
        <TouchableOpacity>
          <Text
            style={[
              styles.footerLink,
              { color: colors.primary },
            ]}
          >
            Terms
          </Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.footerText,
            { color: colors.textMuted },
          ]}
        >
          {' '}and{' '}
        </Text>

        <TouchableOpacity>
          <Text
            style={[
              styles.footerLink,
              { color: colors.primary },
            ]}
          >
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupFooter;