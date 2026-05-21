import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Logo = () => {
  return (
    <View style={styles.logoCircle}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#D7D0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 4,
    borderColor: '#E4D9FF',
  },
  logo: {
    width: 90,
    height: 90,
  },
});

export default Logo;