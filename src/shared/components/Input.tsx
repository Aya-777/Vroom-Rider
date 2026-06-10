import React from 'react';
import {
  TextInput,
  TextInputProps,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Radius } from '../../core/theme/tokens/radius';
import { Typography } from '../../core/theme/tokens/typography';

interface InputProps extends TextInputProps {
  error?: string;
}

export default function Input({ error, style, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      <TextInput style={[error ? styles.inputError : null, style]} {...props} />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  inputError: { borderColor: 'red', borderWidth: 0.5, borderRadius: Radius.sm },
  errorText: { color: 'red', ...Typography.smallCaption },
});
