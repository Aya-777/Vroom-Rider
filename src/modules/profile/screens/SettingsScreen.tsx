import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import { ProfileStackScreenProps } from '../../../navigation/main/profile/profileTypes';
import LinearBg from '../../../shared/components/LinearBg';
import SubHeader from '../../../shared/components/SubHeader';
import { createSettingsStyles } from '../styles/settings.styles';
import { useNavigation } from '@react-navigation/native';

const rows: [string, string][] = [
    ['Privacy', 'Manage the data you share with us'],
    ['Appearance', 'Use device settings'],
    ['Accessibility', 'Manage your accessibility settings'],
    ['Ride Check', 'Manage your RideCheck notifications'],
    ['Manage Vroom Account', 'Update your profile and account details'],
    ['Facebook', 'Follow Vroom on Facebook'],
    ['Instagram', 'Follow Vroom on Instagram'],
];

export default function SettingsScreen() {
    const { colors } = useTheme();
    const styles = createSettingsStyles(colors);
    const navigation = useNavigation<ProfileStackScreenProps<'Settings'>['navigation']>();

    return (
        <LinearBg
            style={styles.container}
            colors={[colors.backgroundSoft, colors.background]}
        >
            <SubHeader title="Settings" onBackPress={() => navigation.goBack()} />

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

                    <Text style={styles.arrow}>-&gt;</Text>
                </View>

                {/* App Settings */}
                <Text style={styles.sectionTitle}>App settings</Text>

                {rows.map(([title, subtitle], index) => (
                    <View key={title}>
                        {index === 3 && (
                            <Text style={styles.sectionTitle}>Safety</Text>
                        )}
                        {index === 5 && (
                            <Text style={styles.sectionTitle}>Connect with Vroom</Text>
                        )}

                        <TouchableOpacity style={styles.row}>
                            <Text style={styles.rowIconText}>*</Text>

                            <View style={styles.rowCopy}>
                                <Text style={styles.rowTitle}>{title}</Text>
                                <Text style={styles.rowSubtitle}>{subtitle}</Text>
                            </View>

                            <Text style={styles.arrow}>-&gt;</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </LinearBg>
    );
}