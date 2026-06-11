import React, { useState } from 'react';
import {
  TextInput,
  TextInputProps,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Radius } from '../../core/theme/tokens/radius';
import { Typography } from '../../core/theme/tokens/typography';

type InputType = 'text' | 'phone' | 'password';

interface InputProps extends Omit<TextInputProps, 'style'> {
  type?: InputType;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  renderLeftIcon?: () => React.ReactNode;
  renderRightIcon?: (isPasswordVisible?: boolean) => React.ReactNode;
}

export default function Input({
  type = 'text',
  error,
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

  const handleTextChange = (text: string) => {
    if (type === 'phone') {
      const cleaned = text.replace(/[^0-9]/g, '');
      const limited = cleaned.slice(0, 10);
      onChangeText?.(limited);
    } else {
      onChangeText?.(text);
    }
  };

  const finalMaxLength = type === 'phone' ? 10 : props.maxLength;

  const isPassword = type === 'password';
  const finalSecureTextEntry = isPassword ? !isPasswordVisible : secureTextEntry;
  const finalKeyboardType = type === 'phone' ? 'numeric' : keyboardType;

  return (
    //     <View style={styles.container}>
    //       <TextInput style={[error ? styles.inputError : null, style]} {...props} />
    //       {error && <Text style={styles.errorText}>{error}</Text>}
    //     </View>
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

const styles = StyleSheet.create({

  defaultContainer: {
    marginBottom: 15,
    width: '100%',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  defaultInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  //   container: {},
  //   inputError: { borderColor: 'red', borderWidth: 0.5, borderRadius: Radius.sm },
  //   errorText: { color: 'red', ...Typography.smallCaption },
  container: {},

  inputError: {
    borderColor: 'red',
    borderWidth: 0.5,
    borderRadius: Radius.sm,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    ...Typography.smallCaption,
  },
});