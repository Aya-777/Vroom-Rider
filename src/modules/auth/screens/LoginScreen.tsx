import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import LoginPin from '../components/LoginPin';
import LoginForm from '../components/LoginForm';
import LoginFooter from '../components/LoginFooter';

import { useLoginViewModel } from '../viewmodels/useLoginViewModel';
import { useTheme } from '../../../core/theme/useTheme';

const LoginScreen = ({ navigation }: any) => {
  const vm = useLoginViewModel(navigation);
  const { colors } = useTheme();

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
            <View
              style={[
                styles.bgCircle,
                { backgroundColor: colors.surfaceAccent },
              ]}
            />

            <Text
              style={[
                styles.title,
                { color: colors.textSecondary },
              ]}
            >
              VROOM
            </Text>

            <LoginPin>
              <LoginForm vm={vm} />
            </LoginPin>

            <LoginFooter />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1 },
  flex: { flex: 1 },
  scroll: { alignItems: 'center', paddingBottom: 40 },

  bgCircle: {
    position: 'absolute',
    width: 700,
    height: 900,
    borderRadius: 350,
    left: -280,
    top: -30,
  },

  title: {
    marginTop: 24,
    marginBottom: 10,
    fontSize: 32,
    fontFamily: 'Lora-Bold',
  },
});