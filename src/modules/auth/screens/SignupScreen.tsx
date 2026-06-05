import React from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import SignupForm from '../components/SignupForm';
import SignupFooter from '../components/SignupFooter';
import { useTheme } from '../../../core/theme/useTheme';
import { useSignupViewModel } from '../viewmodels/useSignupViewModel';
import { createStyles } from '../styles/signup.styles';
import SignupCard from '../components/SignupCard';
import LinearBg from '../../../shared/components/LinearBg';

const SignupScreen = () => {
  const vm = useSignupViewModel();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <LinearBg
      colors={[colors.backgroundSoft, colors.background]}
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

            <Text
              style={[
                styles.title,
              ]}
            >
              VROOM
            </Text>

            <SignupCard>
              <SignupForm vm={vm} />
            </SignupCard>

            <SignupFooter />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearBg>
  );
};

export default SignupScreen;