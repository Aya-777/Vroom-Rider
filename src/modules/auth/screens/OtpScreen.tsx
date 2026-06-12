import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import LinearBg from '../../../shared/components/LinearBg';
import Header from '../../../shared/components/SubHeader';
import Button from '../components/shared/Button';
import { useTheme } from '../../../core/theme/useTheme';
import { useOtpViewModel } from '../viewmodels/useOtpViewModel';
import { createStyles } from '../styles/OtpScreen.styles';
import { AuthStackScreenProps } from '../../../navigation/auth/authTypes';
import OtpInputFields from '../components/OTP/OtpInputFields';

export default function OtpScreen({ navigation, route }: AuthStackScreenProps<'Otp'>) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const {
    code,
    activeCodeIndex,
    isLoading,
    inputRefs,
    maskedPhoneNumber,
    handleTextChange,
    handleKeyPress,
    handleVerifyCode,
    handleResendCode,
    handleBack,
    setActiveCodeIndex,
  } = useOtpViewModel(navigation, route);

  return (
    <LinearBg style={styles.container} colors={[colors.backgroundSoft, colors.background]}>

      <Header title="Verify Number" onBackPress={handleBack} />

      <View style={styles.content}>
        <Text style={styles.title}>Check Your Messages</Text>

        <Text style={styles.description}>
          We sent a reset link to <Text style={styles.phoneNumber}>{maskedPhoneNumber}
          </Text> enter 6 digit code that mentioned in the Message
        </Text>

        <OtpInputFields
          code={code}
          activeCodeIndex={activeCodeIndex}
          inputRefs={inputRefs}
          handleTextChange={handleTextChange}
          handleKeyPress={handleKeyPress}
          setActiveCodeIndex={setActiveCodeIndex}
          styles={styles}
        />

        <Button
          title="Verify Code"
          onPress={handleVerifyCode}
          isLoading={isLoading}
          colors={colors}
        />

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Haven't got the code yet? </Text>
          <TouchableOpacity onPress={handleResendCode} activeOpacity={0.7}>
            <Text style={styles.resendLink}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearBg>
  );
}