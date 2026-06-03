import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
// import { Typography } from '../../../core/theme/tokens/typography';
import { createStyles } from '../styles/login.styles';

const LoginFooter = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          { color: colors.textSecondary },
        ]}>
        Don't have an account?{' '}
        <Text
          style={[
            styles.link,
            { color: colors.primary },
          ]}>
          Register
        </Text>
      </Text>

      <Text
        style={[
          styles.link,
          { color: colors.primary },
        ]}>
        Forgot Password?
      </Text>
    </View>
  );
};

export default LoginFooter;
