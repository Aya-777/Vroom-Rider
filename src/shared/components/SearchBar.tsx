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
import ScheduleIcon from '../../assets/svg/schedule.svg';
import SearchIcon from '../../assets/svg/search.svg';

function SearchBar(){
  return(
    <View style={styles.searchContainer}>
      <SearchIcon fill="#0F1E52"/>
      <TextInput 
        placeholder="Where to?" 
        placeholderTextColor="#A0A5BA" 
        style={styles.searchInput}
      />
      <View style={styles.divider} />
      <TouchableOpacity style={styles.timeButton}>
        <ScheduleIcon fill="#1E2243" />
        <Text style={styles.timeText}>Now</Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  // Search Bar Styles
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#C6C5D133',
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
    color: '#0F1E52',
    fontWeight: '400',
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#C6C5D133',
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
    color: '#0F1E52',
    marginLeft: 4,
  },
});

export default SearchBar;