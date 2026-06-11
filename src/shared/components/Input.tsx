import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { createStyles } from '../styles/input.styles'

type InputType = 'text' | 'phone' | 'password' | 'username';

interface InputProps extends Omit<TextInputProps, 'style'> {
  type?: InputType;
  error?: string;
  onErrorChange?: (error: string | undefined) => View; // Callback لتمرير الخطأ للفورم الأساسي إذا أحببت
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  renderLeftIcon?: () => React.ReactNode;
  renderRightIcon?: (isPasswordVisible?: boolean) => React.ReactNode;
}

export default function Input({
  type = 'text',
  error: externalError,
  containerStyle,
  inputStyle,
  onChangeText,
  secureTextEntry,
  keyboardType,
  renderLeftIcon,
  renderRightIcon,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>(undefined);

  const handleTextChange = (text: string) => {
    let finalValidText = text;

    if (type === 'phone') {
      finalValidText = text.replace(/[^0-9]/g, '');
    }
    onChangeText?.(finalValidText);
    if (finalValidText.length === 0) {
      setLocalError(undefined);
    } else if (type === 'password' && finalValidText.length < 8) {
      setLocalError('Password must be at least 8 characters');
    } else if (type === 'username' && finalValidText.length < 2) {
      setLocalError('Username must be at least 2 characters');
    } else {
      setLocalError(undefined);
    }
  };

  const getMaxLength = () => {
    if (type === 'phone') return 10;
    if (type === 'password') return 50;
    if (type === 'username') return 20;
    return props.maxLength;
  };

  const finalMaxLength = getMaxLength();
  const isPassword = type === 'password';
  const finalSecureTextEntry = isPassword ? !isPasswordVisible : secureTextEntry;
  const finalKeyboardType = type === 'phone' ? 'numeric' : keyboardType;
  const error = externalError || localError;

  const styles = createStyles();


  return (
    //     <View style={styles.container}>
    //       <TextInput style={[error ? styles.inputError : null, style]} {...props} />
    //       {error && <Text style={styles.errorText}>{error}</Text>}

    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputBox, error ? styles.inputError : null]}>
        {renderLeftIcon && renderLeftIcon()}

        <TextInput
          style={[styles.defaultInput, inputStyle]}
          onChangeText={handleTextChange}
          secureTextEntry={finalSecureTextEntry}
          keyboardType={finalKeyboardType}
          maxLength={finalMaxLength}
          {...props}
        />

        {isPassword && renderRightIcon && (
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            {renderRightIcon(isPasswordVisible)}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}
