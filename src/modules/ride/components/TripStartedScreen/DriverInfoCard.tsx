// src/shared/components/DriverInfoCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ProfileIcon from '../../../../assets/svg/profile/profile.svg';
import PhoneIcon from '../../../../assets/svg/contact/call.svg';
import StarIcon from '../../../../assets/svg/common/star.svg';

export const DriverInfoCard = ({ name, rating, car, plate, styles, colors }: any) => (
  <View style={styles.driverCard}>
    <View style={styles.driverInfoContainer}>
      <ProfileIcon width={50} height={50} style={styles.avatar} />
      <View style={styles.driverTextContainer}>
        <Text style={styles.driverName}>{name}</Text>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Text style={styles.driverDetails}>{rating}</Text>
          <StarIcon width={16} height={16} fill={colors.note}/>
        </View>
        <Text style={styles.driverCar}>{car} • {plate}</Text>
      </View>
      <TouchableOpacity style={styles.callButton}>
        <PhoneIcon width={24} height={24} />
      </TouchableOpacity>
    </View>
  </View>
);