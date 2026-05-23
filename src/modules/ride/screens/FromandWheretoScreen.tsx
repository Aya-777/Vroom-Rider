import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar
} from 'react-native';
import { Colors } from '../../../core/theme';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../shared/components/ride/Header';
import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';

import ProfileIcon from '../../../assets/svg/profile.svg';
import ScheduleIcon from '../../../assets/svg/schedule.svg';
import PinIcon from '../../../assets/svg/pin.svg';
import StarIcon from '../../../assets/svg/star.svg';
import DropDownArrowIcon from '../../../assets/svg/arrows/dropdownArrow.svg';
import ArrowIcon from '../../../assets/svg/arrows/arrow.svg';
import ArrowUp from '../../../assets/svg/arrows/arrowUp.svg';
import MyLocationIcon from '../../../assets/svg/myLocation.svg';

const { width, height } = Dimensions.get('window');

export default function StartRideScreen() {
  const navigation = useNavigation<any>();

  const [isNowDropdownOpen, setIsNowDropdownOpen] = useState(false);
  const [isForMeDropdownOpen, setIsForMeDropdownOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState('For me');
  const [selectedTime, setSelectedTime] = useState('Now');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F4FA" translucent={false} />
      <Header
        title="Ride"
        onBackPress={() => {navigation.goBack()
        }}
      />
      {/* MAP VIEW COMPONENT */}

      {/* 4. BOTTOM SHEET PANEL */}
        <BottomSheetCard>
        {/* Dropdowns Row */}
        <View style={styles.dropdownRow}>
          
          <View style={{ zIndex: 10 }}> 
            <TouchableOpacity 
              style={styles.dropdown} 
              onPress={() => setIsNowDropdownOpen(!isNowDropdownOpen)}
            >
              <ScheduleIcon fill={Colors.primary}/>
              <Text style={styles.dropdownText}>{selectedTime}</Text>
              {isNowDropdownOpen ? <ArrowUp fill={Colors.primary} /> : <DropDownArrowIcon fill={Colors.primary}/>}
            </TouchableOpacity>

            {/* Conditional Dropdown List Menu */}
            {isNowDropdownOpen && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity 
                  style={styles.menuItem} 
                  onPress={() => {
                    setSelectedTime('Now'); 
                    setIsNowDropdownOpen(false);
                  }}
                >
                  <Text style={[styles.menuItemText, selectedTime === 'Now' && styles.selectedMenuText]}>Now</Text>
                </TouchableOpacity>
                
                <View style={styles.menuDivider} />
                
                <TouchableOpacity 
                  style={styles.menuItem} 
                  onPress={() => {
                    setSelectedTime('Schedule');
                    setIsNowDropdownOpen(false);
                  }}
                >
                  <Text style={[styles.menuItemText, selectedTime === 'Schedule' && styles.selectedMenuText]}>Schedule</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          <View style={{ zIndex: 10 }}> 
            <TouchableOpacity 
              style={styles.dropdown} 
              onPress={() => setIsForMeDropdownOpen(!isForMeDropdownOpen)}
            >
              <ProfileIcon fill={Colors.primary}/>
              <Text style={styles.dropdownText}>{selectedPerson}</Text>
              {isForMeDropdownOpen ? <ArrowUp fill={Colors.primary} /> : <DropDownArrowIcon fill={Colors.primary}/>}
            </TouchableOpacity>

            {/* Conditional Dropdown List Menu */}
            {isForMeDropdownOpen && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity 
                  style={styles.menuItem} 
                  onPress={() => {
                    setSelectedPerson('For Me');
                    setIsForMeDropdownOpen(false);
                  }}
                >
                  <Text style={[styles.menuItemText, selectedPerson === "For Me" && styles.selectedMenuText]}>For Me</Text>
                </TouchableOpacity>
                
                <View style={styles.menuDivider} />
                
                <TouchableOpacity 
                  style={styles.menuItem} 
                  onPress={() => {
                    setSelectedPerson('Other Contact');
                    setIsForMeDropdownOpen(false);
                  }}
                >
                  <Text style={[styles.menuItemText, selectedPerson === "Other Contact" && styles.selectedMenuText]}>Other Contact</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
              
        {/* Inputs Card */}
        <View style={styles.inputCard}>
          <View style={styles.inputTimeline}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineLine} />
            <View style={styles.timelineDot} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input} 
              placeholder="From" 
              placeholderTextColor="#C0BCC7"
              editable={!isNowDropdownOpen && !isForMeDropdownOpen} 
            />
            <View style={styles.divider} />
            <TextInput 
              style={styles.input} 
              placeholder="To?" 
              placeholderTextColor="#C0BCC7" 
              editable={!isNowDropdownOpen && !isForMeDropdownOpen}
            />
          </View>
        </View>

        {/* Quick Action Buttons Row */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            <PinIcon fill={'#5C4E75'}/>
            <Text style={styles.actionButtonText}>Set on map</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <StarIcon fill={'#5C4E75'} />
            <Text style={styles.actionButtonText}>Saved places</Text>
          </TouchableOpacity>
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
          <ArrowIcon fill={Colors.background}/>
        </TouchableOpacity>
        </BottomSheetCard>
      </View>    
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151324',
  },
  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  locationButton: {
    position: 'absolute',
    top: height * 0.53,
    right: 20,
    backgroundColor: '#E8E5F2',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dropdown: {
    flexDirection: 'row',
    backgroundColor: '#DDD8F0',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 6,
    elevation: 1,
  },
  dropdownIcon: {
    marginRight: 6,
  },
  dropdownText: {
    color: '#1A1C29',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 4,
    marginLeft: 4,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 42, 
    left: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 120,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadows for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    paddingVertical: 4,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 14,
    color: '#5C4E75',
    fontWeight: '500',
  },
  selectedMenuText: {
    color: '#443366',
    fontWeight: '700',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#EAE6F8',
    marginHorizontal: 8,
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputTimeline: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    verticalAlign: 'middle',
    paddingVertical: 10,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1C9E8',
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#EAE6F8',
    marginVertical: 4,
  },
  inputContainer: {
    flex: 1,
    marginLeft: 10,
  },
  input: {
    height: 35,
    fontSize: 15,
    color: '#1A1C29',
    padding: 0,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0Edf7',
    marginVertical: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '48%',
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  actionIcon: {
    marginRight: 6,
  },
  actionButtonText: {
    color: '#5C4E75',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#443366',
    width: '50%',
    paddingVertical: 14,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 5,
    marginBottom: 2,
  },
});