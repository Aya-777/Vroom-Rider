import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../../core/theme/colors';
import { Typography } from '../../../core/theme/typography';
import { Spacing } from '../../../core/theme/spacing';
import { Radius } from '../../../core/theme/radius';

import LinearGradient from 'react-native-linear-gradient';
import PhoneNumberIcon from '../../../assets/svg/phoneNumber.svg';
import PasswordIcon from '../../../assets/svg/password.svg';
import VisibilityOnIcon from '../../../assets/svg/visibilityOn.svg';
import VisibilityOffIcon from '../../../assets/svg/visibilityOff.svg';
import LinearBg from '../../../shared/components/LinearBg';
import Logo from '../../../shared/components/logo';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
  <LinearGradient
    colors={['#F0EBFF', '#FAFAFF']}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={{ flex: 1 }}
  >
    <SafeAreaView style={styles.container}>
      {/* Background Circle */}
      <View style={styles.backgroundCircle} />

      {/* Logo */}
      <Text style={styles.logoText}>VROOM</Text>

      {/* Pin Shape */}
      <View style={styles.pinContainer}>
        {/* Circle Part */}
        <View style={styles.pinCircle}>
          {/* Logo */}
          <Logo />

          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <PhoneNumberIcon width='20' height='20' fill="#7A7AA0" />

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
            <PasswordIcon width='20' height='20' fill="#7A7AA0" />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#9B9BB5"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            <TouchableOpacity onPress ={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? (
              <VisibilityOnIcon width='20' height='20' fill="#7A7AA0" />
              ) : (
                <VisibilityOffIcon width='20' height='20' fill="#7A7AA0" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity 
        style={styles.button}
        // just for testing
        onPress={() => navigation.navigate('Home')}
        >
          <LinearBg
            style={styles.button}
            colors={['#0F1E52', '#625A7A']}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearBg>
        </TouchableOpacity>

        {/* Triangle Bottom */}
        <View style={styles.triangle} />
      </View>

      {/* Bottom Texts */}
      <View style={styles.bottomContainer}>
        <Text style={styles.registerText} adjustsFontSizeToFit={true} numberOfLines={1}>
          Don't have an account?{' '}
          <Text style={styles.register}>Register</Text>
        </Text>

        <Text style={styles.forgot}>Forgot Password?</Text>
      </View>
    </SafeAreaView>
  </LinearGradient>
);
};

export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   gradient: {
//   width: '100%',
//   alignItems: 'center',
// },

//   backgroundCircle: {
//     position: 'absolute',
//     width: 780,
//     height: 884,
//     borderRadius: 300,
//     backgroundColor: '#E4D9FF',
//     left: -300,
//   },

//   logoText: {
//     marginTop: 30,
//     marginBottom: 20,
//     fontSize: 35,
//     fontWeight: '700',
//     color: '#7E7BAA',
//   },

//   pinContainer: {
//     marginTop: 70,
//     alignItems: 'center',
//   },
  
//   pinCircle: {
//     width: 340,
//     backgroundColor: 'rgba(255,255,255,0.5)',
//     borderRadius: 180,
//     borderBottomLeftRadius:230,
//     borderBottomRightRadius:230,
//     alignItems: 'center',
//     paddingTop: 40,
//     paddingBottom: 70,
//     zIndex: 2,
//   },

//   triangle: {
//     width: 0,
//     height: 0,
//     borderLeftWidth: 163,
//     borderRightWidth: 163,
//     borderTopWidth: 310,
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderTopColor: 'rgba(255, 255, 255, 0.4)',
//     marginTop: -150,
//     zIndex: 0,
//   },

//   inputContainer: {
//     width: 290,
//     height: 55,
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     marginBottom: 18,
//   },

//   input: {
//     flex: 1,
//     marginLeft: 10,
//     color: '#333',
//     fontSize: 16,
//   },

//   button: {
//     width: 280,
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 14,
//     zIndex: 3,
//     marginTop: -30,
//   },

//   buttonText: {
//     color: '#FAFAFF',
//     fontSize: 18,
//     fontWeight: '700',
//   },

//   bottomContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   registerText: {
//     fontSize: 14,
//     color: '#1A1C20',
//     fontWeight: '500',
//   },

//   register: {
//     color: '#0F1E52',
//     fontWeight: '700',
//   },

//   forgot: {
//     marginTop: 10,
//     fontSize: 14,
//     color: '#0F1E52',
//     fontWeight: '700',
//   },
//   absoluteBlurCard: {
//     width: 280,
//     height: 180,
//     borderRadius: 16,
//     overflow: 'hidden', // Crucial for iOS border radius to work with BlurView
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  backgroundCircle: {
    position: 'absolute',
    width: 780,
    height: 884,
    borderRadius: 300,
    backgroundColor: Colors.accent,
    left: -300,
  },

  logoText: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
    ...Typography.h1,
    color: '#7E7BAA', // keep brand-specific accent (optional to move later)
  },

  pinContainer: {
    marginTop: 70,
    alignItems: 'center',
  },

  pinCircle: {
    width: 340,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: Radius.full,
    borderBottomLeftRadius: Radius.full,
    borderBottomRightRadius: Radius.full,
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: 70,
    zIndex: 2,
  },

  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 163,
    borderRightWidth: 163,
    borderTopWidth: 310,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'rgba(255, 255, 255, 0.4)',
    marginTop: -150,
    zIndex: 0,
  },

  inputContainer: {
    width: 290,
    height: 55,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },

  input: {
    flex: 1,
    marginLeft: Spacing.sm,
    color: Colors.primary,
    ...Typography.body,
  },

  button: {
    width: 280,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Radius.md,
    zIndex: 3,
    marginTop: -30,
  },

  buttonText: {
    color: Colors.background,
    ...Typography.h3,
  },

  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  registerText: {
    ...Typography.caption,
    color: Colors.secondary,
  },

  register: {
    color: Colors.primary,
    fontWeight: '700',
  },

  forgot: {
    marginTop: Spacing.sm,
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '700',
  },
});