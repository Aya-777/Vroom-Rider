// DriverOnboardingScreen.tsx
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/driver.styles';
import { ProfileStackScreenProps } from '../../../navigation/main/profile/profileTypes';
import SubHeader from '../../../shared/components/SubHeader';
import { useTranslation } from 'react-i18next';
import LinearBg from '../../../shared/components/LinearBg';



export default function DriverOnboardingScreen() {
    const { colors } = useTheme();
    const navigation = useNavigation<ProfileStackScreenProps<'DriverOnboarding'>['navigation']>();
    const { t } = useTranslation('profile');
    const styles = createStyles(colors);

    const steps: [string, string, string][] = [
        ['1', t('step1Title'), t('step1Description')],
        ['2', t('step2Title'), t('step2Description')],
        ['3', t('step3Title'), t('step3Description')],
    ];

    return (
        <LinearBg style={styles.container} colors={[colors.backgroundSoft, colors.background]}>

            <SubHeader title={t('vroomDrivers')} onBackPress={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={styles.content}>
                {/* Hero Section */}
                <ImageBackground
                    source={require('../../../assets/images/driver-hero.png')}
                    style={styles.hero}
                    imageStyle={styles.heroImage}
                >
                    <LinearBg
                        colors={['transparent', colors.background]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.heroOverlay}
                    >
                        <Text style={styles.heroTitle}>{t('driveWithVroom')}</Text>
                        <Text style={styles.heroSub}>{t('driveWithVroomSubtitle')}</Text>
                    </LinearBg>
                </ImageBackground>

                {/* Onboarding Steps */}
                <Text style={styles.section}>{t('onboardingProcess')}</Text>

                {steps.map(([number, stepTitle, description], index) => (
                    <View style={styles.row} key={number}>
                        <View style={styles.dotColumn}>
                            <View style={styles.dot}>
                                <Text style={styles.dotText}>{number}</Text>
                            </View>
                            {index < steps.length - 1 && <View style={styles.connector} />}
                        </View>

                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>{stepTitle}</Text>
                            <Text style={styles.desc}>{description}</Text>
                        </View>
                    </View>
                ))}

                {/* Apply Now Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{t('readyToStart')}</Text>
                    <Text style={styles.cardSubtitle}>{t('officialApplicationForm')}</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>{t('applyNow')}</Text>
                    </TouchableOpacity>
                </View>

                {/* Support Section */}
                <View style={styles.support}>
                    <View style={styles.supportLeft}>
                        <View style={styles.supportIcon}>
                            <Text style={styles.supportIconText}>?</Text>
                        </View>
                        <Text style={styles.supportText}>{t('needAssistance')}</Text>
                    </View>
                    <Text style={styles.link}>{t('contactSupport')}</Text>
                </View>
            </ScrollView>
        </LinearBg>

    );
}



