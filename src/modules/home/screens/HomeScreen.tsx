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
// Assuming you use react-native-vector-icons. 
// If not installed, replace these with Image components or your preferred icon library.
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearBg from '../../../shared/components/LinearBg';

export default function HomeScreen() {
  return (
  <LinearBg
    colors={['#F0EBFF', '#FAFAFF']}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={{ flex: 1 }}
    >
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="menu" size={24} color="#2E3192" />
        </TouchableOpacity>
        <Text style={styles.logoText}>VROOM</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="notifications-none" size={24} color="#2E3192" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="#1E2243" style={styles.searchIcon} />
          <TextInput 
            placeholder="Where to?" 
            placeholderTextColor="#A0A5BA" 
            style={styles.searchInput}
          />
          <View style={styles.divider} />
          <TouchableOpacity style={styles.timeButton}>
            <MaterialIcons name="access-time" size={20} color="#1E2243" />
            <Text style={styles.timeText}>Now</Text>
          </TouchableOpacity>
        </View>

        {/* For You Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>For you</Text>
        </View>

        {/* Grid Services */}
        <View style={styles.gridContainer}>
          {/* Active Ride Service */}
          <View style={styles.gridItemContainer}>
            <TouchableOpacity style={[styles.gridItem, styles.activeGridItem]}>
              <FontAwesome5 name="car" size={24} color="#1E2243" />
            </TouchableOpacity>
            <Text style={[styles.gridLabel, styles.activeGridLabel]}>Ride</Text>
          </View>

          {/* Package Service */}
          <View style={styles.gridItemContainer}>
            <TouchableOpacity style={styles.gridItem}>
              <MaterialIcons name="inventory" size={24} color="#A0A5BA" />
            </TouchableOpacity>
            <Text style={styles.gridLabel}>Package</Text>
          </View>

          {/* Rent Service */}
          <View style={styles.gridItemContainer}>
            <TouchableOpacity style={styles.gridItem}>
              <FontAwesome5 name="key" size={20} color="#A0A5BA" />
            </TouchableOpacity>
            <Text style={styles.gridLabel}>Rent</Text>
          </View>

          {/* Reserve Service */}
          <View style={styles.gridItemContainer}>
            <TouchableOpacity style={styles.gridItem}>
              <MaterialIcons name="calendar-today" size={22} color="#A0A5BA" />
            </TouchableOpacity>
            <Text style={styles.gridLabel}>Reserve</Text>
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
              <MaterialIcons name="home" size={24} color="#FFF" />
            </View>
            <View style={styles.destTextContainer}>
              <Text style={styles.destTitle}>Home</Text>
              <Text style={styles.destSubtitle}>248 West 35th St, New York</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8E8E93" />
          </TouchableOpacity>

          {/* Office Item */}
          <TouchableOpacity style={styles.destinationCard}>
            <View style={styles.destIconContainer}>
              <MaterialIcons name="business-center" size={22} color="#FFF" />
            </View>
            <View style={styles.destTextContainer}>
              <Text style={styles.destTitle}>Office</Text>
              <Text style={styles.destSubtitle}>One World Trade Center</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="home" size={26} color="#A0A5BA" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="car" size={22} color="#A0A5BA" />
          <Text style={styles.navLabel}>Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <MaterialIcons name="person" size={26} color="#2E3192" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>PROFILE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </LinearBg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#EAE8FC', // Soft lavender tint matching the screenshot background
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
  // Search Bar Styles
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 55,
    marginTop: 10,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#1E2243',
    fontWeight: '400',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E4EB',
    marginHorizontal: 10,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2243',
    marginLeft: 4,
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
    color: '#1E2243',
  },
  // Grid Services Styles
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
    backgroundColor: '#E2E4EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeGridItem: {
    backgroundColor: '#D6D3FA', // Highlighted light purple accent background
    shadowColor: '#2E3192',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  gridLabel: {
    fontSize: 14,
    color: '#8A8D9F',
    fontWeight: '500',
  },
  activeGridLabel: {
    color: '#1E2243',
    fontWeight: '700',
  },
  // Destination Cards Styles
  destinationList: {
    gap: 12,
  },
  destinationCard: {
    flexDirection: 'row',
    backgroundColor: '#F3F1FF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  destIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#303463',
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
    color: '#1E2243',
    marginBottom: 2,
  },
  destSubtitle: {
    fontSize: 13,
    color: '#A0A5BA',
  },
  // Bottom Navigation Styles
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
    paddingBottom: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  activeNavItem: {
    borderTopWidth: 3,
    borderTopColor: '#2E3192',
    height: '100%',
    justifyContent: 'center',
    paddingTop: 4,
  },
  navLabel: {
    fontSize: 11,
    color: '#A0A5BA',
    marginTop: 4,
    fontWeight: '600',
  },
  activeNavLabel: {
    color: '#2E3192',
    fontWeight: 'bold',
  },
});
