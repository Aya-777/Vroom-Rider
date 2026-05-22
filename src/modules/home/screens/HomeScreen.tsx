import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
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

export default function HomeScreen() {
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
      <BottomNav />
    </SafeAreaView>
  </LinearBg>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1 
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1E2243',
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 50,
    // Soft shadow for top action items
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  // Section Headers
  sectionHeader: {
    marginBottom: 15,
  },
  destinationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3A3D63',
  },
  seeAllText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F1E52',
  },
  // Grid Services Styles
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  gridItemContainer: {
    alignItems: 'center',
    width: '23%',
    marginBottom: 15,
  },
  gridItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8E8ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeGridItem: {
    backgroundColor: '#E4D9FF', // Highlighted light purple accent background
    shadowColor: '#111317',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 2,
  },
  gridLabel: {
    fontSize: 14,
    color: '#8A8D9F',
    fontWeight: '500',
  },
  activeGridLabel: {
    color: '#0F1E52',
    fontWeight: '700',
  },
  // Destination Cards Styles
  destinationList: {
    gap: 12,
  },
  destinationCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  destIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F1E52',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  destTextContainer: {
    flex: 1,
  },
  destTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F1E52',
    marginBottom: 2,
  },
  destSubtitle: {
    fontSize: 13,
    color: '#45464F50',
  },
});
