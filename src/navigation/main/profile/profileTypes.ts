import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile:
  | { firstName?: string; lastName?: string; phone?: string; profileImage?: string | null }
  | undefined;
  ChangePhone: undefined;
  ChangePhoneOtp: { newPhone: string };
  PaymentMethods: undefined;
};

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, T>;