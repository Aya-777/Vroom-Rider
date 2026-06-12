import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Otp : undefined;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = 
  NativeStackScreenProps<AuthStackParamList, T>;

  import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthNavigationProp =
  NativeStackNavigationProp<AuthStackParamList>;