import React from 'react';
import { View, ScrollView } from 'react-native';

import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/profile.styles';

import { useProfileViewModel } from '../viewmodels/useProfileViewModel';
import { useProfileActions } from '../hooks/useProfileActions';

import ProfileCard from '../components/ProfileCard';
import GridSection from '../components/GridSection';
import PromoBanner from '../components/PromoBanner';
import ListSection from '../components/ListSection';
import LogoutButton from '../components/LogoutButton';
import LinearBg from '../../../shared/components/LinearBg';


export default function ProfileScreen() {

  const { gridItems, listItems} = useProfileViewModel();
  const { logout } = useProfileActions();
  
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <LinearBg
      colors={[colors.backgroundSoft, colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.container}>
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
      </View>
    </LinearBg>
  );
}