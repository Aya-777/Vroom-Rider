import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../core/theme';

const LoginFooter = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Don't have an account? <Text style={styles.link}>Register</Text>
      </Text>

      <Text style={styles.link}>Forgot Password?</Text>
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
    color: Colors.secondary,
  },

  link: {
    ...Typography.boldCaption,
    color: Colors.primary,
  },
});