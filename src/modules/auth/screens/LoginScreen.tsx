import React from 'react';
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import LoginPin from '../components/LoginPin';
import LoginForm from '../components/LoginForm';
import LoginFooter from '../components/LoginFooter';

import { useLoginViewModel } from '../viewmodels/useLoginViewModel';
import { Colors, Typography, Spacing } from '../../../core/theme';

const LoginScreen = () => {
  const vm = useLoginViewModel();

  return (
    <LinearGradient colors={['#F0EBFF', '#FAFAFF']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

            <View style={styles.bgCircle} />

            <Text style={styles.title}>VROOM</Text>

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
    backgroundColor: Colors.accent,
    left: -280,
    top: -30,
  },

  title: {
    marginTop: Spacing.xl,
    marginBottom: 10,
    ...Typography.h1,
    color: '#7E7BAA',
  },
});