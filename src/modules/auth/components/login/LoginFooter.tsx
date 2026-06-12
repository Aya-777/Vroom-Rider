import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/login.styles';

type Props = {
  onSignupPress?: () => void;
  onForgotPasswordPress?: () => void;
};

const LoginFooter = ({ onSignupPress, onForgotPasswordPress }: Props) => {

  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <View style ={styles.content}>
        <Text
          style={[
            styles.text,
          ]}>
          Don't have an account?{' '}
          <TouchableOpacity onPress={onSignupPress}>
            <Text
              style={[
                styles.link,
              ]}>
              Signup
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
      <TouchableOpacity onPress={onForgotPasswordPress}>
        <Text
          style={[
            styles.link,
          ]}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginFooter;
