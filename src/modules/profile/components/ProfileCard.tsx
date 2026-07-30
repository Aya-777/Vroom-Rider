import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { apiClient } from '../../../core/network/apiClient';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/profile.styles';

import EditIcon from '../../../assets/svg/common/edit.svg';
import CallIcon from '../../../assets/svg/contact/call.svg';

type Props = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImage?: string | null;
  isLoading?: boolean;
  onEditPress?: () => void;
};


export default function ProfileCard({
  firstName,
  lastName,
  phone,
  profileImage,
  isLoading,
  onEditPress,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const IMAGE_BASE_URL = `${apiClient.defaults.baseURL}media/`;
  const fullName = isLoading
    ? '...'
    : [firstName, lastName].filter(Boolean).join(' ') || '—';

  return (
    <View style={styles.profileCard}>
      {/* Edit */}
      <TouchableOpacity style={styles.editButton} onPress={onEditPress} disabled={!onEditPress}>
        <EditIcon fill={colors.background} />
      </TouchableOpacity>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        {profileImage ? (
          <Image
            source={{
              uri: `${IMAGE_BASE_URL}${profileImage}`,
            }}
            style={styles.avatarPlaceholder}
            onError={(e) => console.log('IMAGE ERROR', e.nativeEvent)}
          />) : (
          <View style={styles.avatarPlaceholder}>
            <View style={styles.avatarHead} />
            <View style={styles.avatarBody} />
          </View>
        )}
      </View>

      {/* Divider */}
      <View style={styles.verticalDivider}>
        <View style={styles.dotIndicator} />
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Text style={styles.userName}>{fullName}</Text>

        <View style={styles.iconText}>
          <CallIcon width={18} height={18} fill={colors.background} />
          <Text style={styles.infoText}>{isLoading ? '...' : phone || '—'}</Text>
        </View>
      </View>
    </View>
  );
}