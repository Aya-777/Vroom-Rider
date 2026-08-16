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

const steps: [string, string, string][] = [
    [
        '1',
        'Open the Application Form',
        'Review the requirements and start your professional driver profile.',
    ],
    [
        '2',
        'Personal & Vehicle Details',
        'Upload your license, insurance, and vehicle registration documents securely.',
    ],
    [
        '3',
        'Await Verification',
        'Our team reviews all documents within 48 hours to get you on the road quickly.',
    ],
];

export default function DriverOnboardingScreen() {
    const { colors } = useTheme();
    const navigation = useNavigation<ProfileStackScreenProps<'DriverOnboarding'>['navigation']>();
    const { t } = useTranslation(['profile']);
    const styles = createStyles(colors);

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
                        <Text style={styles.heroTitle}>Drive with Vroom</Text>
                        <Text style={styles.heroSub}>
                            Earn on your own terms with industry-leading flexibility.
                        </Text>
                    </LinearBg>
                </ImageBackground>

                {/* Onboarding Steps */}
                <Text style={styles.section}>Onboarding Process</Text>

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
                    <Text style={styles.cardTitle}>Ready to Start?</Text>
                    <Text style={styles.cardSubtitle}>Official Application Form</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Apply Now</Text>
                    </TouchableOpacity>
                </View>

                {/* Support Section */}
                <View style={styles.support}>
                    <View style={styles.supportLeft}>
                        <View style={styles.supportIcon}>
                            <Text style={styles.supportIconText}>?</Text>
                        </View>
                        <Text style={styles.supportText}>Need assistance?</Text>
                    </View>
                    <Text style={styles.link}>Contact Support</Text>
                </View>
            </ScrollView>
        </LinearBg>

    );
}



