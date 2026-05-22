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
import MenuIcon from '../../assets/svg/menu.svg';
import NotificationsIcon from '../../assets/svg/notifications.svg';


function Header(){
  return(
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconButton}>
        <MenuIcon fill='#0F1E52'/>
      </TouchableOpacity>
      <Text style={styles.logoText}>VROOM</Text>
      <TouchableOpacity style={styles.iconButton}>
        <NotificationsIcon fill='#0F1E52'/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  iconButton: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1E2243',
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
  },
});

export default Header;