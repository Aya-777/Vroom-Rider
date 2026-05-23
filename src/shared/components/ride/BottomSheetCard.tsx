import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');
import { Colors } from '../../../core/theme';
import MyLocationIcon from '../../../assets/svg/myLocation.svg';


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

      <View style={styles.bottomSheetInner}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
    bottomWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'flex-end',
  },
  bottomSheetInner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
    alignItems: 'center',
  },
  locationButton: {
    position: 'absolute',
    backgroundColor: '#E8E5F2',
    width: 44,
    height: 44,
    top: height * 0.53,
    right: 20,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#EAE6F8',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
    alignItems: 'center',
  },
});

export default BottomSheetCard;