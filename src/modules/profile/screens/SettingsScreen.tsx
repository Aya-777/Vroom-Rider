import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../core/theme/useTheme';
import { ProfileStackScreenProps } from '../../../navigation/main/profile/profileTypes';
import LinearBg from '../../../shared/components/LinearBg';
import SubHeader from '../../../shared/components/SubHeader';
import { createSettingsStyles } from '../styles/settings.styles';
import { LanguageService } from '../../../core/i18n/services/LanguageService';
import { SupportedLanguage } from '../../../core/i18n/types';
import PrivacyIcon from '../../../assets/svg/profile/privacy.svg';
import AppearanceIcon from '../../../assets/svg/profile/appearance.svg';
import AccessibilityIcon from '../../../assets/svg/profile/accessibility.svg';
import RideCheckIcon from '../../../assets/svg/profile/rideCheck.svg';
import ManageIcon from '../../../assets/svg/profile/manage.svg';
import FacebookIcon from '../../../assets/svg/profile/facebook.svg';
import InstagramIcon from '../../../assets/svg/profile/instagram.svg';
import ArrowIcon from '../../../assets/svg/arrows/arrow.svg';

const languageOptions: { code: SupportedLanguage; labelKey: string }[] = [
    { code: 'en', labelKey: 'english' },
    { code: 'ar', labelKey: 'arabic' },
];

export default function SettingsScreen() {
    const { colors } = useTheme();
    const styles = createSettingsStyles(colors);
    const { t } = useTranslation('profile');
    const navigation = useNavigation<ProfileStackScreenProps<'Settings'>['navigation']>();

    const [language, setLanguage] = useState<SupportedLanguage>('en');
    const [languageOpen, setLanguageOpen] = useState(false);

    useEffect(() => {
        setLanguage(LanguageService.getCurrentLanguage() as SupportedLanguage);
    }, []);

    const selectLanguage = async (next: SupportedLanguage) => {
        setLanguage(next);
        setLanguageOpen(false);
        await LanguageService.changeLanguage(next);
    };

    const rows = [
        [PrivacyIcon, t('privacy'), t('privacyDesc')],
        [AppearanceIcon, t('appearance'), t('appearanceDesc')],
        [AccessibilityIcon, t('accessibility'), t('accessibilityDesc')],
        [RideCheckIcon, t('rideCheck'), t('rideCheckDesc')],
        [ManageIcon, t('manageVroomAccount'), t('manageVroomAccountDesc')],
        [FacebookIcon, t('facebook'), t('facebookDesc')],
        [InstagramIcon, t('instagram'), t('instagramDesc')],
    ] as const;

    return (
        <LinearBg style={styles.container} colors={[colors.backgroundSoft, colors.background]}>
            <SubHeader title={t('settings')} onBackPress={() => navigation.navigate('ProfileHome')} />

            <ScrollView contentContainerStyle={styles.content}>
                {/* Account Card */}
                <View style={styles.accountCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>V</Text>
                    </View>

                    <View style={styles.accountCopy}>
                        <Text style={styles.accountName}>{t('vroomAccount')}</Text>
                        <Text style={styles.accountDetail}>
                            {t('manageYourPersonalInformation')}
                        </Text>
                    </View>

                    <ArrowIcon width={20} height={20} fill={colors.textMuted} />
                </View>

                {/* Language */}
                <View style={styles.languageBlock}>
                    <Text style={styles.sectionTitle}>{t('language')}</Text>

                    <TouchableOpacity
                        style={styles.languageSelector}
                        onPress={() => setLanguageOpen((v) => !v)}
                    >
                        <Text style={styles.languageValue}>
                            {language === 'ar' ? t('arabic') : t('english')}
                        </Text>
                        <ArrowIcon width={18} height={18} fill={colors.textMuted} />
                    </TouchableOpacity>

                    {languageOpen && (
                        <View style={styles.languageOptions}>
                            {languageOptions.map((option) => (
                                <TouchableOpacity
                                    key={option.code}
                                    style={[
                                        styles.languageOption,
                                        language === option.code && styles.languageOptionActive,
                                    ]}
                                    onPress={() => selectLanguage(option.code)}
                                >
                                    <Text style={styles.languageOptionText}>{t(option.labelKey)}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* App Settings */}
                <Text style={styles.sectionTitle}>{t('appSettings')}</Text>

                {rows.map(([Icon, title, subtitle], index) => (
                    <View key={title}>
                        {index === 3 && (
                            <Text style={styles.sectionTitle}>{t('safety')}</Text>
                        )}
                        {index === 5 && (
                            <Text style={styles.sectionTitle}>{t('connectWithVroom')}</Text>
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