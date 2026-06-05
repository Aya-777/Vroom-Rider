import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/login.styles';

const LoginFooter = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
        ]}>
        Don't have an account?{' '}
        <Text
          style={[
            styles.link,
          ]}>
          Register
        </Text>
      </Text>

      <Text
        style={[
          styles.link,
        ]}>
        Forgot Password?
      </Text>
    </View>
  );
};

export default LoginFooter;
