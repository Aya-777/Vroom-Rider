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
import HistoryIcon from '../../assets/svg/history.svg';
import ProfileIcon from '../../assets/svg/profile.svg';
import HomeIcon from '../../assets/svg/home.svg';

function BottomNav() {
  return(
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <HomeIcon fill={'#0F1E52'}/>
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <HistoryIcon fill={'#45464F50'}/>
          <Text style={styles.navLabel}>Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <ProfileIcon fill={'#45464F50'} />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

  );
}

const styles = StyleSheet.create({
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
    borderTopColor: '#0F1E52',
    height: '100%',
    justifyContent: 'center',
    paddingTop: 4,
  },
  navLabel: {
    fontSize: 11,
    color: '#45464F50',
    marginTop: 4,
    fontWeight: '600',
  },
  activeNavLabel: {
    color: '#0F1E52',
    fontWeight: 'bold',
  },
});

export default BottomNav;