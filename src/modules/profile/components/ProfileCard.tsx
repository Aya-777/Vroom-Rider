import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/profile.styles';

import EditIcon from '../../../assets/svg/edit.svg';
import CallIcon from '../../../assets/svg/call.svg';
import MailIcon from '../../../assets/svg/mail.svg';
import PinIcon from '../../../assets/svg/pin.svg';

export default function ProfileCard() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View
      style={[
        styles.profileCard,
        { backgroundColor: colors.primary },
      ]}
    >
      {/* Edit button */}
      <TouchableOpacity style={styles.editButton}>
        <EditIcon fill={colors.background} />
      </TouchableOpacity>

      {/* Name */}
      <Text
        style={[
          styles.profileName,
          { color: colors.background },
        ]}
      >
        Alex Driver
      </Text>

      {/* Phone */}
      <View style={styles.infoRow}>
        <CallIcon fill={colors.background} />
        <Text
          style={[
            styles.infoText,
            { color: colors.background },
          ]}
        >
          +1 (555) 012-3456
        </Text>
      </View>

      {/* Email */}
      <View style={styles.infoRow}>
        <MailIcon fill={colors.background} />
        <Text
          style={[
            styles.infoText,
            { color: colors.background },
          ]}
        >
          alex.driver@vroom.io
        </Text>
      </View>

      {/* Location */}
      <View style={styles.infoRow}>
        <PinIcon fill={colors.background} />
        <Text
          style={[
            styles.infoText,
            { color: colors.background },
          ]}
        >
          Damascus, Jaramana
        </Text>
      </View>
    </View>
  );
}