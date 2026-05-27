import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import { Typography } from '../../../core/theme/tokens/typography';

const LoginFooter = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        Don't have an account?{' '}
        <Text style={[styles.link, { color: colors.primary }]}>
          Register
        </Text>
      </Text>

      <Text style={[styles.link, { color: colors.primary }]}>
        Forgot Password?
      </Text>
    </View>
  );
};

export default LoginFooter;

const styles = StyleSheet.create({
  container: {
    marginTop: -20,
    alignItems: 'center',
  },

  text: {
    ...Typography.caption,
  },

  link: {
    ...Typography.boldCaption,
  },
});