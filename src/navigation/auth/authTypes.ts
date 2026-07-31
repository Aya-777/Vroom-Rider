import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Otp: {
    phoneNumber: string;
    type?: 'signup' | 'forgot_password';
  };
  ResetPassword: {
    phoneNumber: string;
    resetToken: string;
  };
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;


export type AuthNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;