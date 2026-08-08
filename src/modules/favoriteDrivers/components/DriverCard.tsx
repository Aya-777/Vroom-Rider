import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Driver } from '../types/driver.type';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/favoriteDrivers.styles';
import MessageIcon from '../../../assets/svg/contact/chat.svg';
import StarIcon from '../../../assets/svg/common/star.svg';
import CallIcon from '../../../assets/svg/contact/call.svg';
import { useTranslation } from 'react-i18next';

interface DriverCardProps {
  driver: Driver;
  onActionPress: () => void;
  onMessagePress: () => void;
}

export const DriverCard: React.FC<DriverCardProps> = ({
  driver,
  onActionPress,
  onMessagePress,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation('favoriteDrivers');

  const getStatusBadge = () => {
    switch (driver.status) {
      case 'available':
        return (
          <View style={[styles.badge, { backgroundColor: '#dcfce7' }]}>
            <View style={[styles.dot, { backgroundColor: '#22c55e' }]} />
            <Text
              style={[
                styles.badgeText,
                { backgroundColor: 'transparent', color: '#15803d' },
              ]}
            >
              {t('favoriteDrivers.status.available')}
            </Text>
          </View>
        );
      case 'on_trip':
        return (
          <View style={[styles.badge, { backgroundColor: '#ffedd5' }]}>
            <View style={[styles.dot, { backgroundColor: '#f97316' }]} />
            <Text style={[styles.badgeText, { color: '#c2410c' }]}>
              {t('favoriteDrivers.status.onTrip')}
            </Text>
          </View>
        );
      case 'offline':
        return (
          <View style={[styles.badge, { backgroundColor: '#f1f5f9' }]}>
            <View style={[styles.dot, { backgroundColor: '#94a3b8' }]} />
            <Text style={[styles.badgeText, { color: '#64748b' }]}>
              {t('favoriteDrivers.status.offline')}
            </Text>
          </View>
        );
    }
  };

  const isOffline = driver.status === 'offline';

  return (
    <View style={styles.card}>
      {/* Top Header */}
      <View style={styles.headerRow}>
        <Image source={{ uri: driver.avatarUrl }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{driver.name}</Text>
          <View style={styles.ratingRow}>
            <StarIcon width={20} height={20} fill={'#eab308'} />
            <Text style={styles.ratingText}>
              {driver.rating} {t('favoriteDrivers.details.rating')}
            </Text>
          </View>
        </View>
        {getStatusBadge()}
      </View>

      {/* Details Grid */}
      <View style={styles.detailsGrid}>
        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>
            {t('favoriteDrivers.details.phone')}
          </Text>
          <Text style={styles.detailValue}>{driver.phone}</Text>
        </View>
        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>
            {t('favoriteDrivers.details.plate')}
          </Text>
          <View style={styles.plateContainer}>
            <Text style={styles.plateText}>{driver.plate}</Text>
          </View>
        </View>
      </View>

      <View style={styles.vehicleSection}>
        <Text style={styles.detailLabel}>
          {t('favoriteDrivers.details.vehicle')}
        </Text>
        <View style={styles.vehicleRow}>
          <Text style={styles.vehicleName}>{driver.vehicleName}</Text>
        </View>
      </View>

      {/* Action Footer */}
      <View style={styles.footerRow}>
        <TouchableOpacity
          style={[styles.primaryButton, isOffline && styles.offlineButton]}
          onPress={onActionPress}
          activeOpacity={0.8}
          disabled={isOffline}
        >
          {driver.status === 'available' && (
            <CallIcon width={16} height={16} color={colors.textSecondary} />
          )}
          {/*{driver.status === 'on_trip' && <Ionicons name="navigate" size={16} color="#ffffff" />}
          {driver.status === 'offline' && <Ionicons name="notifications-outline" size={16} color="#94a3b8" />} */}

          <Text
            style={[
              styles.primaryButtonText,
              isOffline && styles.offlineButtonText,
            ]}
          >
            {driver.status === 'available' && 'Call Driver'}
            {driver.status === 'on_trip' && 'Track Route'}
            {driver.status === 'offline' && 'Notify When Active'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chatButton}
          onPress={onMessagePress}
          activeOpacity={0.8}
        >
          <MessageIcon width={20} height={20} fill={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
