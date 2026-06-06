import React from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import LoginPin from '../components/login/LoginPin';
import LoginForm from '../components/login/LoginForm';
import LoginFooter from '../components/login/LoginFooter';
import { useLoginViewModel } from '../viewmodels/useLoginViewModel';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/login.styles';
import LinearBg from '../../../shared/components/LinearBg';

const LoginScreen = () => {
  const vm = useLoginViewModel();
  const { handleNavigateToSignup } = vm;
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <LinearBg
      colors={[colors.background, colors.backgroundSoft]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={[
                styles.bgCircle,
              ]}
            />

            <Text
              style={[
                styles.title,
              ]}
            >
              VROOM
            </Text>

            <LoginPin>
              <LoginForm vm={vm} />
            </LoginPin>

            <LoginFooter
              onSignupPress={handleNavigateToSignup}
              onForgotPasswordPress={() => console.log('Forgot password pressed')}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearBg>
  );
};

export default LoginScreen;

