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
import SearchBar from '../../../shared/components/SearchBar';
import Header from '../../../shared/components/Header';

import { useTheme } from '../../../core/theme/useTheme';
import { Typography, Spacing, Radius, Shadows } from '../../../core/theme/tokens';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';

export default function HomeScreen({ navigation }: HomeStackScreenProps<'HomeScreen'>) {
  const { colors } = useTheme();

  return (
    <LinearBg
      colors={[colors.backgroundSoft, colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <Header />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <SearchBar />

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              For you
            </Text>
          </View>

          <View style={styles.gridContainer}>
            <View style={styles.gridItemContainer}>
              <TouchableOpacity
                style={[
                  styles.gridItem,
                  { backgroundColor: colors.backgroundSoft },
                  styles.activeGridItem,
                ]}
                onPress={() => navigation.navigate('SelectRide')}
              >
                <RideIcon fill={colors.textSecondary} />
              </TouchableOpacity>

              <Text style={[styles.gridLabel, { color: colors.textSecondary }]}>
                Ride
              </Text>
            </View>

            <View style={styles.gridItemContainer}>
              <TouchableOpacity
                style={[
                  styles.gridItem,
                  { backgroundColor: colors.border },
                ]}
              >
                <ReserveIcon fill={colors.textMuted} />
              </TouchableOpacity>

              <Text style={[styles.gridLabel, { color: colors.textSecondary }]}>
                Reserve
              </Text>
            </View>
          </View>

          <View style={styles.destinationHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
              Recent destinations
            </Text>

            <TouchableOpacity>
              <Text style={{ color: colors.primary }}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.destinationList}>
            <TouchableOpacity
              style={[
                styles.destinationCard,
                { backgroundColor: colors.surface },
              ]}
            >
              <View
                style={[
                  styles.destIconContainer,
                  { backgroundColor: colors.primary },
                ]}
              >
                <HomeIcon fill={colors.background} />
              </View>

              <View style={styles.destTextContainer}>
                <Text style={[styles.destTitle, { color: colors.textPrimary }]}>
                  Home
                </Text>

                <Text
                  style={[styles.destSubtitle, { color: colors.textSecondary }]}
                >
                  248 West 35th St, New York
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.destinationCard,
                { backgroundColor: colors.surface },
              ]}
            >
              <View
                style={[
                  styles.destIconContainer,
                  { backgroundColor: colors.primary },
                ]}
              >
                <WorkIcon fill={colors.background} />
              </View>

              <View style={styles.destTextContainer}>
                <Text style={[styles.destTitle, { color: colors.textPrimary }]}>
                  Office
                </Text>

                <Text
                  style={[styles.destSubtitle, { color: colors.textSecondary }]}
                >
                  One World Trade Center
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  },

  gridContainer: {
    flexDirection: 'row',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  activeGridItem: {
    ...Shadows.small,
  },

  gridLabel: {
    ...Typography.caption,
    textAlign: 'center',
  },

  destinationList: {
    gap: Spacing.sm,
  },

  destinationCard: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    alignItems: 'center',
  },

  destIconContainer: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },

  destTextContainer: {
    flex: 1,
  },

  destTitle: {
    ...Typography.boldBody,
    marginBottom: 2,
  },

  destSubtitle: {
    ...Typography.caption,
  },
});