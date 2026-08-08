import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { Driver } from '../types/driver.type';

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
  const getStatusBadge = () => {
    switch (driver.status) {
      case 'available':
        return (
          <View style={[styles.badge, { backgroundColor: '#dcfce7' }]}>
            <View style={[styles.dot, { backgroundColor: '#22c55e' }]} />
            <Text style={[styles.badgeText, { backgroundColor: 'transparent', color: '#15803d' }]}>Available</Text>
          </View>
        );
      case 'on_trip':
        return (
          <View style={[styles.badge, { backgroundColor: '#ffedd5' }]}>
            <View style={[styles.dot, { backgroundColor: '#f97316' }]} />
            <Text style={[styles.badgeText, { color: '#c2410c' }]}>On Trip</Text>
          </View>
        );
      case 'offline':
        return (
          <View style={[styles.badge, { backgroundColor: '#f1f5f9' }]}>
            <View style={[styles.dot, { backgroundColor: '#94a3b8' }]} />
            <Text style={[styles.badgeText, { color: '#64748b' }]}>Offline</Text>
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
            {/* <Ionicons name="star" size={14} color="#eab308" /> */}
            <Text style={styles.ratingText}>{driver.rating} RATING</Text>
          </View>
        </View>
        {getStatusBadge()}
      </View>

      {/* Details Grid */}
      <View style={styles.detailsGrid}>
        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>PHONE</Text>
          <Text style={styles.detailValue}>{driver.phone}</Text>
        </View>
        <View style={styles.detailColumn}>
          <Text style={styles.detailLabel}>PLATE</Text>
          <View style={styles.plateContainer}>
            <Text style={styles.plateText}>{driver.plate}</Text>
          </View>
        </View>
      </View>

      <View style={styles.vehicleSection}>
        <Text style={styles.detailLabel}>VEHICLE</Text>
        <View style={styles.vehicleRow}>
          <View style={[styles.colorDot, { backgroundColor: driver.vehicleColor }]} />
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
          {/* {driver.status === 'available' && <Ionicons name="call" size={16} color="#ffffff" />}
          {driver.status === 'on_trip' && <Ionicons name="navigate" size={16} color="#ffffff" />}
          {driver.status === 'offline' && <Ionicons name="notifications-outline" size={16} color="#94a3b8" />} */}
          
          <Text style={[styles.primaryButtonText, isOffline && styles.offlineButtonText]}>
            {driver.status === 'available' && 'Call Driver'}
            {driver.status === 'on_trip' && 'Track Route'}
            {driver.status === 'offline' && 'Notify When Active'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.chatButton} onPress={onMessagePress} activeOpacity={0.8}>
          {/* <Ionicons name="chatbubble-outline" size={18} color="#0f172a" /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e2e8f0',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.5,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  detailsGrid: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailColumn: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  plateContainer: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  plateText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1d4ed8',
  },
  vehicleSection: {
    marginBottom: 16,
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  vehicleName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  footerRow: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#0f172a',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  offlineButton: {
    backgroundColor: '#f1f5f9',
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  offlineButtonText: {
    color: '#94a3b8',
  },
  chatButton: {
    width: 44,
    height: 44,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});