import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  // StyleSheet,
} from 'react-native';

import PhoneNumberIcon from '../../../assets/svg/phoneNumber.svg';
import PasswordIcon from '../../../assets/svg/password.svg';
import VisibilityOnIcon from '../../../assets/svg/visibilityOn.svg';
import VisibilityOffIcon from '../../../assets/svg/visibilityOff.svg';

import Logo from '../../../shared/components/logo';
import LinearBg from '../../../shared/components/LinearBg';

import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/login.styles';

const LoginForm = ({ vm }: any) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <>
      {/* LOGO */}
      <View style={styles.top}>
        <Logo />
      </View>

      {/* INPUTS */}
      <View style={styles.middle}>
        <View
          style={[
            styles.inputBox,
            { backgroundColor: colors.surface },
          ]}
        >
          <PhoneNumberIcon width={20} height={20} />

          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={colors.textMuted}
            value={vm.phone}
            onChangeText={vm.setPhone}
            style={[styles.input, { color: colors.textPrimary }]}
          />
        </View>

        <View
          style={[
            styles.inputBox,
            { backgroundColor: colors.surface },
          ]}
        >
          <PasswordIcon width={20} height={20} />

          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.textMuted}
            secureTextEntry={!vm.visible}
            value={vm.password}
            onChangeText={vm.setPassword}
            style={[styles.input, { color: colors.textPrimary }]}
          />

          <TouchableOpacity onPress={vm.togglePassword}>
            {vm.visible ? (
              <VisibilityOnIcon width={20} height={20} />
            ) : (
              <VisibilityOffIcon width={20} height={20} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* BUTTON */}
      <View style={styles.bottom}>
        <TouchableOpacity onPress={vm.handleLogin}>
          <LinearBg
            style={styles.button}
            colors={[colors.textPrimary, colors.surface]} // (مؤقتاً - بنحسنه بعدين)
          >
            <Text style={[styles.btnText, { color: colors.backgroundSoft }]}>
              Continue
            </Text>
          </LinearBg>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginForm;

