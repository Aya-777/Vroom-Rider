import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearBg from '../../../shared/components/LinearBg';
import Header from '../../../shared/components/SubHeader';
import Input from '../../../shared/components/Input';
import { useTheme } from '../../../core/theme/useTheme';
import { useForgotPasswordViewModel } from '../viewmodels/useForgotPasswordViewModel';
import { createStyles } from '../styles/forgotPassword.styles';

export default function ForgotPasswordScreen({ navigation }: any) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  
  const {
    phoneNumber,
    error,
    isLoading,
    handlePhoneChange,
    handleResetPassword,
    handleBack,
  } = useForgotPasswordViewModel(navigation);

  return (
    <LinearBg style={styles.container}
     colors={[colors.backgroundSoft , colors.background]}
     >

      <Header 
        title="Forgot Password" 
        onBackPress={handleBack} 
      />

      <View style={styles.content}>
        <Text style={styles.description}>
          Please enter your phone number to reset {'\n'}the password
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Your Phone Number</Text>
         
          <Input
            type="phone"
            placeholder="Enter Your Phone Number"
            placeholderTextColor={colors.textMuted} 
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            error={error}
            containerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
          />

          <TouchableOpacity
            style={[styles.button]} 
            onPress={handleResetPassword}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.background } />
            ) : (
              <Text style={styles.buttonText}>Reset Password</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </LinearBg>
  );
}