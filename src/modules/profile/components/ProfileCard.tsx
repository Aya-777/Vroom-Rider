import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/profile.styles';
import { getFullImageUrl } from '../../../shared/utils/getImageUrl';

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
  const fullName = isLoading
    ? '...'
    : [firstName, lastName].filter(Boolean).join(' ') || '—';

  const imageUrl = getFullImageUrl(profileImage);

  return (
    <View style={styles.profileCard}>
      <TouchableOpacity style={styles.editButton} onPress={onEditPress} disabled={!onEditPress}>
        <EditIcon fill={colors.background} />
      </TouchableOpacity>

      <View style={styles.avatarContainer}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.avatarPlaceholder}
            onError={(e) => console.log('IMAGE ERROR', e.nativeEvent)}
          />) : (
          <View style={styles.avatarPlaceholder}>
            <View style={styles.avatarHead} />
            <View style={styles.avatarBody} />
          </View>
        )}
      </View>

      <View style={styles.verticalDivider}>
        <View style={styles.dotIndicator} />
      </View>

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