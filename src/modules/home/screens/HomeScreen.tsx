import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LinearBg from '../../../shared/components/LinearBg';
import WorkIcon from '../../../assets/svg/work.svg';
import ReserveIcon from '../../../assets/svg/reserve.svg';
import RideIcon from '../../../assets/svg/ride.svg';
import HomeIcon from '../../../assets/svg/home.svg';
import BottomNav from '../../../shared/components/BottomNav'
import SearchBar from '../../../shared/components/SearchBar'
import Header from '../../../shared/components/Header';
import { useState } from 'react';
import { Colors , Typography, Spacing, Radius, Shadows} from '../../../core/theme';



const services = [
  {
    id: 'ride',
    title: 'Ride',
    icon: RideIcon,
    active: true,
  },
  {
    id: 'reserve',
    title: 'Reserve',
    icon: ReserveIcon,
    active: false,
  },
];

const savedDestinations = [
  {
    id: 'home',
    title: 'Home',
    subtitle: '248 West 35th St, New York'
  },
  {
    id: 'office',
    title: 'Office',
    subtitle: 'One World Trade Center'
  }
];
type BottomNavTab = 'HOME' | 'ACTIVITY' | 'PROFILE';

export default function HomeScreen() {
  const [currentTab, setCurrentTab] = useState<BottomNavTab>('HOME');
  return (
  <LinearBg
    colors={['#F0EBFF', '#FAFAFF']}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={styles.gradientContainer}
    >
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <SearchBar />
        {/* For You Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>For you</Text>
        </View>

        {/* Grid Services */}
        <View style={styles.gridContainer}>
          {/* Active Ride Service */}
          <View style={styles.gridItemContainer}>
            <TouchableOpacity style={[styles.gridItem, styles.activeGridItem]}>
              <RideIcon fill="#1E2243" />
            </TouchableOpacity>
            <Text style={[styles.gridLabel, styles.activeGridLabel]}>{services[0].title}</Text>
          </View>

          {/* Reserve Service */}
          <View style={styles.gridItemContainer}>
            <TouchableOpacity style={styles.gridItem}>
              <ReserveIcon fill="#A0A5BA" />
            </TouchableOpacity>
            <Text style={styles.gridLabel}>{services[1].title}</Text>
          </View>
        </View>

        {/* Recent Destinations Section */}
        <View style={styles.destinationHeader}>
          <Text style={styles.sectionTitle}>Recent destinations</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Destination List */}
        <View style={styles.destinationList}>
          {/* Home Item */}
          <TouchableOpacity style={styles.destinationCard}>
            <View style={styles.destIconContainer}>
              <HomeIcon fill="#FAFAFF" />
            </View>
            <View style={styles.destTextContainer}>
              <Text style={styles.destTitle}>{savedDestinations[0].title}</Text>
              <Text style={styles.destSubtitle}>{savedDestinations[0].subtitle}</Text>
            </View>
          </TouchableOpacity>

          {/* Office Item */}
          <TouchableOpacity style={styles.destinationCard}>
            <View style={styles.destIconContainer}>
              <WorkIcon fill="#FAFAFF" />
            </View>
            <View style={styles.destTextContainer}>
              <Text style={styles.destTitle}>{savedDestinations[1].title}</Text>
              <Text style={styles.destSubtitle}>{savedDestinations[1].subtitle}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </SafeAreaView>
  </LinearBg>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100,
  },

  // Header Styles (you can remove this if Header is reusable)
  // header: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   paddingHorizontal: Spacing.lg,
  //   paddingVertical: Spacing.md,
  // },

  logoText: {
    ...Typography.h2,
    color: Colors.primary,
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
  },

  iconButton: {
    backgroundColor: Colors.surface,
    padding: Spacing.sm,
    borderRadius: Radius.full,
    ...Shadows.small,
  },

  // Section Headers
  sectionHeader: {
    marginBottom: Spacing.md,
  },

  destinationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },

  sectionTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },

  seeAllText: {
    ...Typography.body,
    // fontWeight: '600',
    color: Colors.primary,
  },

  // Grid Services
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },

  gridItemContainer: {
    alignItems: 'center',
    width: '23%',
    marginBottom: Spacing.md,
  },

  gridItem: {
    width: 60,
    height: 60,
    borderRadius: Radius.full,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  activeGridItem: {
    backgroundColor: Colors.accent,
    ...Shadows.small,
  },

  gridLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  activeGridLabel: {
    ...Typography.boldCaption,
    color: Colors.textPrimary,
  },

  // Destinations
  destinationList: {
    gap: Spacing.sm,
  },

  destinationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    alignItems: 'center',
  },

  destIconContainer: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },

  destTextContainer: {
    flex: 1,
  },

  destTitle: {
    ...Typography.boldBody,
     color: Colors.primary,
    marginBottom: 2,
  },

  destSubtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});