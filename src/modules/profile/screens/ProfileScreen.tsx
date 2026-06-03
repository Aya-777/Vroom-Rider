import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { useTheme } from '../../../core/theme/useTheme';
import { useProfileViewModel } from '../viewmodels/useProfileViewModel';

import ProfileCard from '../components/ProfileCard';
import GridSection from '../components/GridSection';
import PromoBanner from '../components/PromoBanner';
import ListSection from '../components/ListSection';
import LogoutButton from '../components/LogoutButton';
import { createStyles } from '../styles/profile.styles';
import LinearBg from '../../../shared/components/LinearBg';


export default function ProfileScreen() {
  const { colors } = useTheme();
  const { gridItems, listItems, logout } = useProfileViewModel();

  const styles = createStyles(colors);

  return (
    <LinearBg
      colors={[colors.backgroundSoft, colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ProfileCard />

          <GridSection items={gridItems} />

          <PromoBanner />

          <ListSection items={listItems} />

          <LogoutButton onPress={logout} />
        </ScrollView>
      </SafeAreaView>
    </LinearBg>
  );
}