import React from 'react';
import {
  // View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { BlurView } from '@react-native-community/blur';
// import LoginPin from '../components/LoginPin';
import SignupForm from '../components/SignupForm';
import SignupFooter from '../components/SignupFooter';

import { useTheme } from '../../../core/theme/useTheme';
import { useSignupViewModel } from '../viewmodels/useSignupViewModel';
import { createStyles } from '../styles/signup.styles';
import SignupCard from '../components/SignupCard';

const SignupScreen = () => {
  const vm = useSignupViewModel();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <LinearGradient
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
            {/* <View
              style={[
                styles.bgCircle,
                { backgroundColor: colors.surfaceAccent },
              ]}
            /> */}

            <Text
              style={[
                styles.title,
                { color: colors.textMuted },
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
    </LinearGradient>
  );
};

export default SignupScreen;