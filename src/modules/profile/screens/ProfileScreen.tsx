/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { useTheme } from '../../../core/theme/useTheme';
import { useProfileViewModel } from '../viewmodels/useProfileViewModel';

import ProfileCard from '../components/ProfileCard';
import GridSection from '../components/GridSection';
import PromoBanner from '../components/PromoBanner';
import ListSection from '../components/ListSection';
import LogoutButton from '../components/LogoutButton';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { gridItems, listItems, logout } = useProfileViewModel();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileCard />

        <GridSection items={gridItems} />

        <PromoBanner />

        <ListSection items={listItems} />

        <LogoutButton onPress={logout} />
      </ScrollView>
    </SafeAreaView>
  );
}