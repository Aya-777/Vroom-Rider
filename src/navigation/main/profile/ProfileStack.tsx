import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../../../modules/profile/screens/ProfileScreen';
import EditProfileScreen from '../../../modules/profile/screens/EditProfileScreen';
import ChangePhoneScreen from '../../../modules/profile/screens/ChangePhoneScreen';
import ChangePhoneOtpScreen from '../../../modules/profile/screens/ChangePhoneOtpScreen';

import { ProfileStackParamList } from './profileTypes';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangePhone" component={ChangePhoneScreen} />
      <Stack.Screen name="ChangePhoneOtp" component={ChangePhoneOtpScreen} />
    </Stack.Navigator>
  );
}