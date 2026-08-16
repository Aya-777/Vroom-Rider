import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import { ProfileStackScreenProps } from '../../../navigation/main/profile/profileTypes';
import LinearBg from '../../../shared/components/LinearBg';
import SubHeader from '../../../shared/components/SubHeader';
import { createSettingsStyles } from '../styles/settings.styles';
import PrivacyIcon from '../../../assets/svg/profile/privacy.svg';
import AppearanceIcon from '../../../assets/svg/profile/appearance.svg';
import AccessibilityIcon from '../../../assets/svg/profile/accessibility.svg';
import RideCheckIcon from '../../../assets/svg/profile/rideCheck.svg';
import ManageIcon from '../../../assets/svg/profile/manage.svg';
import FacebookIcon from '../../../assets/svg/profile/facebook.svg';
import InstagramIcon from '../../../assets/svg/profile/instagram.svg';
import ArrowIcon from '../../../assets/svg/arrows/arrow.svg';
import { useNavigation } from '@react-navigation/native';

const rows = [[PrivacyIcon, 'Privacy', 'Manage the data you share with us'], [AppearanceIcon, 'Appearance', 'Use device settings'], [AccessibilityIcon, 'Accessibility', 'Manage your accessibility settings'], [RideCheckIcon, 'Ride Check', 'Manage your RideCheck notifications'], [ManageIcon, 'Manage Vroom Account', 'Update your profile and account details'], [FacebookIcon, 'Facebook', 'Follow Vroom on Facebook'], [InstagramIcon, 'Instagram', 'Follow Vroom on Instagram']] as const;

export default function SettingsScreen() {
    const { colors } = useTheme();
    const styles = createSettingsStyles(colors);
    const navigation = useNavigation<ProfileStackScreenProps<'Settings'>['navigation']>();

    return (
        <LinearBg
            style={styles.container}
            colors={[colors.backgroundSoft, colors.background]}
        >
            <SubHeader title="Settings" onBackPress={() => navigation.navigate("ProfileHome")} />

            <ScrollView contentContainerStyle={styles.content}>
                {/* Account Card */}
                <View style={styles.accountCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>V</Text>
                    </View>

                    <View style={styles.accountCopy}>
                        <Text style={styles.accountName}>Vroom Account</Text>
                        <Text style={styles.accountDetail}>
                            Manage your personal information
                        </Text>
                    </View>

                    <ArrowIcon width={20} height={20} fill={colors.textMuted} />
                </View>

                {/* App Settings */}
                <Text style={styles.sectionTitle}>App settings</Text>

                {rows.map(([Icon, title, subtitle], index) => (
                    <View key={title}>
                        {index === 3 && (
                            <Text style={styles.sectionTitle}>Safety</Text>
                        )}
                        {index === 5 && (
                            <Text style={styles.sectionTitle}>Connect with Vroom</Text>
                        )}

                        <TouchableOpacity style={styles.row}>
                            <Icon width={22} height={22} fill={colors.primary} />

                            <View style={styles.rowCopy}>
                                <Text style={styles.rowTitle}>{title}</Text>
                                <Text style={styles.rowSubtitle}>{subtitle}</Text>
                            </View>

                            <ArrowIcon width={20} height={20} fill={colors.textMuted} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </LinearBg>
    );
}



