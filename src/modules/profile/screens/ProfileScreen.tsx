import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import { Typography, Spacing, Radius, Shadows } from '../../../core/theme/tokens';
import { useTheme } from '../../../core/theme/useTheme';

import HistoryIcon from '../../../assets/svg/history.svg';
import NotificationsIcon from '../../../assets/svg/notifications.svg';
import ArrowIcon from '../../../assets/svg/arrows/arrow.svg';
import EditIcon from '../../../assets/svg/edit.svg';
import CallIcon from '../../../assets/svg/call.svg';
import MailIcon from '../../../assets/svg/mail.svg';
import PinIcon from '../../../assets/svg/pin.svg';
import StarIcon from '../../../assets/svg/star.svg';
import EmergencyContactIcon from '../../../assets/svg/emergencyContact.svg';
import SettingsIcon from '../../../assets/svg/settings.svg';
import PrivacyIcon from '../../../assets/svg/privacy.svg';
import SafetyIcon from '../../../assets/svg/safety.svg';
import HelpIcon from '../../../assets/svg/questionMark.svg';
import InfoIcon from '../../../assets/svg/info.svg';
import LogoutIcon from '../../../assets/svg/logout.svg';

import LinearBg from '../../../shared/components/LinearBg';
import { useAuthActions } from '../../auth/authStore';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { logout } = useAuthActions();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* --- Header Profile Card --- */}
        <View style={[styles.profileCard, { backgroundColor: colors.primary }]}>
          <TouchableOpacity style={styles.editButton}>
            <EditIcon />
          </TouchableOpacity>

          <View style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <View style={styles.avatarHead} />
              <View style={styles.avatarBody} />
            </View>
          </View>

          <View style={[styles.verticalDivider, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
            <View style={[styles.dotIndicator, { backgroundColor: colors.background }]} />
          </View>

          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: colors.background }]}>
              Alex Driver
            </Text>

            <View style={styles.iconText}>
              <CallIcon width={18} height={18} />
              <Text style={[styles.infoText, { color: colors.background }]}>
                +1 (555) 012-3456
              </Text>
            </View>

            <View style={styles.iconText}>
              <MailIcon width={18} height={18} />
              <Text style={[styles.infoText, { color: colors.background }]}>
                alex.driver@vroom.io
              </Text>
            </View>

            <View style={styles.iconText}>
              <PinIcon width={18} height={18} />
              <Text style={[styles.infoText, { color: colors.background }]}>
                Damascus, Jaramana
              </Text>
            </View>
          </View>
        </View>

        {/* --- Grid Menu Cards --- */}
        <View style={styles.gridContainer}>

          <LinearBg colors={[colors.surfaceAccent, colors.surface]} style={styles.gridCard}>
            <TouchableOpacity>
              <View style={styles.iconCircle}>
                <HistoryIcon width={30} height={30} />
              </View>
              <Text style={[styles.gridText, { color: colors.textPrimary }]}>
                Ride History
              </Text>
            </TouchableOpacity>
          </LinearBg>

          <LinearBg colors={[colors.surfaceAccent, colors.surface]} style={styles.gridCard}>
            <TouchableOpacity>
              <View style={styles.iconCircle}>
                <NotificationsIcon width={30} height={30} />
              </View>
              <Text style={[styles.gridText, { color: colors.textPrimary }]}>
                Notifications
              </Text>
            </TouchableOpacity>
          </LinearBg>

          <LinearBg colors={[colors.surfaceAccent, colors.surface]} style={styles.gridCard}>
            <TouchableOpacity>
              <View style={styles.iconCircle}>
                <StarIcon width={30} height={30} />
              </View>
              <Text style={[styles.gridText, { color: colors.textPrimary }]}>
                Favorite Drivers
              </Text>
            </TouchableOpacity>
          </LinearBg>

          <LinearBg colors={[colors.surfaceAccent, colors.surface]} style={styles.gridCard}>
            <TouchableOpacity>
              <View style={styles.iconCircle}>
                <SafetyIcon width={30} height={30} />
              </View>
              <Text style={[styles.gridText, { color: colors.textPrimary }]}>
                Safety
              </Text>
            </TouchableOpacity>
          </LinearBg>

        </View>

        {/* --- Promo Banner --- */}
        <TouchableOpacity style={[styles.promoBanner, { borderColor: colors.primary }]}>
          <View style={styles.promoLeft}>
            <Text style={[styles.promoTitle, { color: colors.textPrimary }]}>
              Become a Driver
            </Text>
            <Text style={[styles.promoSubtitle, { color: colors.textMuted }]}>
              Earn on your own schedule
            </Text>
            <Text style={[styles.promoLink, { color: colors.primary }]}>
              Learn more
            </Text>
          </View>
        </TouchableOpacity>

        {/* --- List Options --- */}
        <View style={styles.listContainer}>

          <ListItem icon={<SettingsIcon />} title="Settings" />
          <ListItem icon={<PrivacyIcon />} title="Privacy & Security" />
          <ListItem icon={<EmergencyContactIcon />} title="Emergency Contact" />
          <ListItem icon={<HelpIcon />} title="Help Center" />
          <ListItem icon={<StarIcon />} title="Favorite Locations" />
          <ListItem icon={<InfoIcon />} title="About Us" />
          <ListItem icon={<MailIcon />} title="Contact Us" isLast />

        </View>

        {/* --- Logout --- */}
        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: '#FFF1F1' }]} onPress={() => logout()}>
          <LogoutIcon />
          <Text style={[styles.logoutText, { color: '#EF4444' }]}>
            Logout
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- LIST ITEM ---------------- */

const ListItem = ({ icon, title, isLast }: any) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.listItem,
        {
          backgroundColor: colors.surface,
          borderBottomWidth: isLast ? 0 : 1,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.listLeft}>
        {icon}
        <Text style={[styles.listTitle, { color: colors.textPrimary }]}>
          {title}
        </Text>
      </View>
      <ArrowIcon />
    </TouchableOpacity>
  );
};

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Spacing.xl,
  },

  scrollContent: {
    padding: Spacing.md,
    paddingBottom: 150,
  },

  profileCard: {
    borderRadius: Radius.md,
    padding: Spacing.mmd,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.mmd,
    ...Shadows.medium,
  },

  editButton: {
    position: 'absolute',
    top: 8,
    left: 10,
  },

  avatarContainer: {},

  avatarPlaceholder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#E6E5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarHead: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#B4B2F0',
  },

  avatarBody: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#B4B2F0',
  },

  verticalDivider: {
    width: 1,
    height: '80%',
    marginHorizontal: Spacing.md,
  },

  dotIndicator: {
    position: 'absolute',
    left: -3,
    top: '45%',
    width: 8,
    height: 8,
    borderRadius: Radius.full,
  },

  profileInfo: {
    flex: 1,
  },

  userName: {
    ...Typography.h2,
  },

  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoText: {
    ...Typography.caption,
    marginLeft: 4,
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  gridCard: {
    width: (width - 44) / 2,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Shadows.small,
  },

  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  gridText: {
    ...Typography.boldBody,
  },

  promoBanner: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    ...Shadows.medium,
  },

  promoLeft: {
    flex: 1,
  },

  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  promoSubtitle: {
    fontSize: 13,
    marginVertical: 4,
  },

  promoLink: {
    fontSize: 13,
    fontWeight: 'bold',
  },

  listContainer: {
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    marginBottom: Spacing.xs,
    borderRadius: Radius.sm,
    ...Shadows.small,
  },

  listLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  listTitle: {
    ...Typography.body,
    marginLeft: 12,
  },

  logoutButton: {
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutText: {
    ...Typography.boldBody,
    marginLeft: 8,
  },
});