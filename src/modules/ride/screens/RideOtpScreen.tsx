import React from 'react';
import LinearBg from '../../../shared/components/LinearBg';
import Header from '../../../shared/components/SubHeader';
import OtpVerifyForm from '../../../shared/components/OtpVerifyForm';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../../../shared/styles/otpVerifyForm.styles';
import { useTranslation } from 'react-i18next';
import { useRideNumberVerificationViewModel } from '../viewmodels/useRideNumberVerificationViewModel';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';

const LOCAL_ERROR_KEYS = ['tryAgain', 'incompleteCode', 'invalidOtp'];

export default function OtpScreen({ navigation, route }: HomeStackScreenProps<'RideOtp'>) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['auth', 'common']);

  const vm = useRideNumberVerificationViewModel(navigation, route);

  const displayError = vm.error
    ? LOCAL_ERROR_KEYS.includes(vm.error)
      ? t(vm.error)
      : vm.error
    : undefined;

  return (
    <LinearBg style={styles.container} colors={[colors.backgroundSoft, colors.background]}>
      <Header title={t('verifyNumber')} onBackPress={vm.handleBack} />

      <OtpVerifyForm
        titleLabel={t('checkYourMessages')}
        descriptionLabel={t('weSentLink')}
        targetLabel={vm.maskedPhoneNumber}
        descriptionSuffixLabel={t('6Digits')}
        verifyLabel={t('common:verify')}
        loadingLabel={t('common:loading')}
        haventGotLabel={t('haventGot')}
        resendCodeLabel={t('resendCode')}
        code={vm.code}
        activeCodeIndex={vm.activeCodeIndex}
        inputRefs={vm.inputRefs}
        handleTextChange={vm.handleTextChange}
        handleKeyPress={vm.handleKeyPress}
        setActiveCodeIndex={vm.setActiveCodeIndex}
        onVerify={vm.handleVerifyCode}
        onResend={vm.handleResend}
        isVerifying={vm.isVerifying}
        error={displayError}
      />
    </LinearBg>
  );
}