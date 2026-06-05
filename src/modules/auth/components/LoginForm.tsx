import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import PhoneNumberIcon from '../../../assets/svg/phoneNumber.svg';
import PasswordIcon from '../../../assets/svg/password.svg';
import VisibilityOnIcon from '../../../assets/svg/visibilityOn.svg';
import VisibilityOffIcon from '../../../assets/svg/visibilityOff.svg';
import Logo from './logo';
import LinearBg from '../../../shared/components/LinearBg';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/login.styles';

const LoginForm = ({ vm }: any) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View>
      {/* LOGO */}
      <View style={styles.top}>
        <Logo type="login" />
      </View>

      {/* INPUTS */}
      <View style={styles.middle}>
        <View
          style={[
            styles.inputBox,
          ]}
        >
          <PhoneNumberIcon width={20} height={20} fill={colors.primary} />

          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={colors.textMuted}
            value={vm.phone}
            onChangeText={vm.setPhone}
            style={[styles.input]}
          />
        </View>

        <View
          style={[
            styles.inputBox,
          ]}
        >
          <PasswordIcon width={20} height={20} fill={colors.primary} />

          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.textMuted}
            secureTextEntry={!vm.visible}
            value={vm.password}
            onChangeText={vm.setPassword}
            style={[styles.input]}
          />

          <TouchableOpacity onPress={vm.togglePassword}>
            {vm.visible ? (
              <VisibilityOnIcon width={20} height={20} fill={colors.primary} />
            ) : (
              <VisibilityOffIcon width={20} height={20} fill={colors.primary} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* BUTTON */}
      <View style={styles.bottom}>
        <TouchableOpacity onPress={vm.handleLogin}>
          <LinearBg
            style={styles.button}
            colors={[colors.textPrimary, colors.surface]}
          >
            <Text style={[styles.btnText]}>
              Login
            </Text>
          </LinearBg>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;

