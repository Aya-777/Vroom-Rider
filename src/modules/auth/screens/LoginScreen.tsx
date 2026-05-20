import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';


const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Circle */}
      <View style={styles.backgroundCircle} />

      {/* Logo */}
      <Text style={styles.logoText}>VROOM</Text>

      {/* Pin Shape */}
      <View style={styles.pinContainer}>
        {/* Circle Part */}
        <View style={styles.pinCircle}>
          {/* Logo Circle */}
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>V</Text>
          </View>

          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="#7A7AA0" />

            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="#9B9BB5"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Icon name="more-horizontal" size={20} color="#7A7AA0" />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#9B9BB5"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            <Icon name="eye" size={20} color="#7A7AA0" />
          </View>

          {/* Continue Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Triangle Bottom */}
        <View style={styles.triangle} />
      </View>

      {/* Bottom Texts */}
      <View style={styles.bottomContainer}>
        <Text style={styles.registerText}>
          Don't have an account?{' '}
          <Text style={styles.register}>Register</Text>
        </Text>

        <Text style={styles.forgot}>Forgot Password?</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF',
    alignItems: 'center',
  },

  backgroundCircle: {
    position: 'absolute',
    width: 600,
    height: 600,
    borderRadius: 300,
    backgroundColor: '#E4DFF5',
    bottom: -250,
  },

  logoText: {
    marginTop: 40,
    fontSize: 42,
    fontWeight: '700',
    color: '#7E7BAA',
    letterSpacing: 2,
  },

  pinContainer: {
    marginTop: 40,
    alignItems: 'center',
  },

  pinCircle: {
    width: 320,
    backgroundColor: '#F3F1FA',
    borderTopLeftRadius: 160,
    borderTopRightRadius: 160,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },

  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 120,
    borderRightWidth: 120,
    borderTopWidth: 170,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#F3F1FA',
    marginTop: -1,
  },

  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#D7D0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },

  logoIcon: {
    fontSize: 42,
    color: '#1F1D5A',
    fontWeight: 'bold',
  },

  inputContainer: {
    width: 250,
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
    fontSize: 16,
  },

  button: {
    width: 250,
    height: 60,
    backgroundColor: '#23205F',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  bottomContainer: {
    marginTop: 30,
    alignItems: 'center',
  },

  registerText: {
    fontSize: 16,
    color: '#3F3B59',
  },

  register: {
    color: '#1F1D5A',
    fontWeight: '700',
  },

  forgot: {
    marginTop: 20,
    fontSize: 18,
    color: '#2D295F',
    fontWeight: '700',
  },
});