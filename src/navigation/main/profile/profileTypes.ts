import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile:
  | { firstName?: string; lastName?: string; profileImage?: string | null }
  | undefined;
  PaymentMethods: undefined;
};

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, T>;