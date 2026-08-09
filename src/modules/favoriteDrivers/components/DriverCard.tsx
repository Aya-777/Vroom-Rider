import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Driver } from '../types/driver.type';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/favoriteDrivers.styles';
import MessageIcon from '../../../assets/svg/contact/chat.svg';
import StarIcon from '../../../assets/svg/common/star.svg';
import CallIcon from '../../../assets/svg/contact/call.svg';
import HeartIcon from '../../../assets/svg/common/heart.svg'; // Or favorite.svg depending on your asset choice
import { useTranslation } from 'react-i18next';
import { VELOCITY_EPS } from 'react-native-reanimated/lib/typescript/animation/decay/utils';

interface DriverCardProps {
  driver: Driver;
  isFavorite?: boolean;
  onCallPress: () => void;
  onMessagePress: () => void;
  onToggleFavorite: () => void;
}

export const DriverCard: React.FC<DriverCardProps> = ({
  driver,
  isFavorite = true,
  onCallPress,
  onMessagePress,
  onToggleFavorite,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation('favoriteDrivers');

  return (
    <View style={styles.card}>
      {/* Top Header */}
      <View style={styles.headerRow}>
        <Image source={{ uri: driver.profile_image }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>
            {driver.first_name} {driver.last_name}
          </Text>
          <View style={styles.ratingRow}>
            <StarIcon width={16} height={16} fill={'#eab308'} />
            <Text style={styles.ratingText}>
              {driver.rating} {t('favoriteDrivers.details.rating')}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.smallButton}
          onPress={onToggleFavorite}
          activeOpacity={0.8}
        >
          <HeartIcon
            width={24}
            height={24}
            fill={isFavorite ? colors.error || '#ef4444' : 'transparent'}
            stroke={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Details Grid */}
      <View style={styles.detailsGrid}>
        {/* <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>
            {t('favoriteDrivers.details.phone')}
          </Text>
          <Text style={styles.detailValue}>{driver.phone_number}</Text>
        </View> */}

        <View style={styles.vehicleSection}>
          <View>
            <Text style={styles.detailLabel}>
              {t('favoriteDrivers.details.vehicle')}
            </Text>
            <View style={styles.vehicleRow}>
              <Text style={styles.vehicleName}>
                {driver.vehicle.custom_brand_name ?? driver.vehicle.brand}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.detailLabel}>
              {t('favoriteDrivers.details.plate')}
            </Text>
            <View style={styles.plateContainer}>
              <Text style={styles.plateText}>
                {driver.vehicle.plate_number}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>
            {t('favoriteDrivers.details.color')}
          </Text>
          <Text style={styles.detailValue}>
            {driver.vehicle.custom_color_name ?? driver.vehicle.color}
          </Text>
        </View>
      </View>

      {/* Action Footer (Call & Message Icons Only) */}
      <View style={styles.footerRow}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onCallPress}
          activeOpacity={0.8}
        >
          <CallIcon width={18} height={18} fill={colors.textSecondary} />
          <Text style={styles.primaryButtonText}>
            {t('favoriteDrivers.actions.call', { defaultValue: 'Call Driver' })}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.smallButton}
          onPress={onMessagePress}
          activeOpacity={0.8}
        >
          <MessageIcon width={20} height={20} fill={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
