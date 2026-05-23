import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  Alert
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

const { width, height } = Dimensions.get('window');

export default function ExtraDetailsScreen(){
    const navigation = useNavigation<any>();
  return(
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F4FA" translucent={false} />
      <Header
        title="Ride"
        onBackPress={() => {navigation.goBack()
        }}
      />

      <BottomSheetCard>
        <></>

      </BottomSheetCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151324',
  },
});