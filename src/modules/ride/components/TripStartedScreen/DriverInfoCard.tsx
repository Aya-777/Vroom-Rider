// src/shared/components/DriverInfoCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ProfileIcon from '../../../../assets/svg/profile/profile.svg';
import PhoneIcon from '../../../../assets/svg/contact/call.svg';
import StarIcon from '../../../../assets/svg/common/star.svg';
import HeartIcon from '../../../../assets/svg/common/heart.svg';
import { callPhoneNumber } from '../../utils/conmmunications';

export const DriverInfoCard = ({
  driver,
  vehicle,
  styles,
  colors,
  toggleFavorite,
  isFavorite,
}: any) => (
  <View style={styles.driverCard}>
    <View style={styles.driverInfoContainer}>
      <ProfileIcon
        width={50}
        height={50}
        style={styles.avatar}
      />

      <View style={styles.driverTextContainer}>
        <Text style={styles.driverName}>
          {driver.first_name} {driver.last_name}
        </Text>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Text style={styles.driverDetails}>
            {driver.rating.toFixed(2)}
          </Text>

          <StarIcon
            width={16}
            height={16}
            fill={colors.note}
          />
        </View>

        <Text style={styles.driverCar}>
          {vehicle.car_brand ?? vehicle.custom_brand_name} • {vehicle.plate_number}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.callButton}
        onPress={() => callPhoneNumber(driver.phone_number)}
      >
        <PhoneIcon width={24} height={24} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.callButton}
        onPress={() => {
          toggleFavorite(driver.id)
        }}
      >
        <HeartIcon
          width={24}
          height={24}
          fill={isFavorite ? colors.error : 'none'}
          stroke={isFavorite ? colors.error : colors.textSecondary}
        />
      </TouchableOpacity>
    </View>
  </View>
);