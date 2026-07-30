import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
  payment_methods: undefined;
};

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, T>;
