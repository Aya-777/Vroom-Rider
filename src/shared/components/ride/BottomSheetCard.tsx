import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { Colors, Shadows } from '../../../core/theme';
import MyLocationIcon from '../../../assets/svg/myLocation.svg';
import LinearBg from '../LinearBg'; // Your custom gradient wrapper

interface BottomSheetCardProps {
  children: React.ReactNode;
  onLocationPress?: () => void;
}

export const BottomSheetCard: React.FC<BottomSheetCardProps> = ({ children, onLocationPress }) => {
  return (
    <View style={styles.bottomWrapper}>
      {/* FLOATING LOCATION BUTTON */}
      <TouchableOpacity style={styles.locationButton} onPress={onLocationPress}>
        <MyLocationIcon fill={Colors.primary} />
      </TouchableOpacity>

      {/* --- CHOOSE ONE OPTION BELOW --- */}

      {/* OPTION A: The card panel itself uses your dynamic gradient */}
      <LinearBg 
        colors={[Colors.lightAccent, Colors.surface]} // Custom optional props (Defaults to your component values if removed)
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.bottomSheetInnerGradient}
      >
        {children}
      </LinearBg>

      {/* ALTERNATIVE OPTION B: 
        If you want the card background to remain a solid white color, 
        and instead wrap the ENTIRE wrapper view screen background inside a gradient, 
        you would replace the top parent <View style={styles.bottomWrapper}> with <LinearBg style={styles.bottomWrapper}>
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // Removed absolute positioning on the child element below, 
    // letting the layout wrap naturally so elements don't overlap!
  },
  bottomSheetInnerGradient: {
    backgroundColor: Colors.light,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
    alignItems: 'center',
    width: '100%',
    ...Shadows.medium, // Applied shadows directly to gradient box wrapper
  },
  locationButton: {
    backgroundColor: '#E8E5F2',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 16, // Creates natural layout space above the card edge
    ...Shadows.small
  },
});

export default BottomSheetCard;