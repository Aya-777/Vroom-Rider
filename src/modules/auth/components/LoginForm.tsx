import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import PhoneNumberIcon from '../../../assets/svg/phoneNumber.svg';
import PasswordIcon from '../../../assets/svg/password.svg';
import VisibilityOnIcon from '../../../assets/svg/visibilityOn.svg';
import VisibilityOffIcon from '../../../assets/svg/visibilityOff.svg';

import Logo from '../../../shared/components/logo';
import LinearBg from '../../../shared/components/LinearBg';

import { useTheme } from '../../../core/theme/useTheme';
import { Radius } from '../../../core/theme/tokens/radius';
import { Typography } from '../../../core/theme/tokens/typography';
import { useTranslation } from 'react-i18next';

const LoginForm = ({ vm }: any) => {
  const { colors } = useTheme();
  const { t } = useTranslation('common');

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
            placeholderTextColor={colors.textSecondary}
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
            placeholderTextColor={colors.textSecondary}
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
            colors={['#0F1E52', '#E4D9FF']} // (مؤقتاً - بنحسنه بعدين)
          >
            <Text style={[styles.btnText, { color: '#FAFAFF' }]}>
              {t("continue")}
            </Text>
          </LinearBg>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  top: {
    alignItems: 'center',
    marginBottom: 30,
  },

  middle: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },

  inputBox: {
    width: 280,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    ...Typography.body,
  },

  bottom: {
    marginTop: 25,
    alignItems: 'center',
  },

  button: {
    width: 290,
    height: 60,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText: {
    ...Typography.h3,
  },
});