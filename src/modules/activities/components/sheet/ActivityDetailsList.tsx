import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import HeartIcon from '../../../../assets/svg/common/heart.svg';
import { useTheme } from '../../../../core/theme/useTheme';

export default function ActivityDetailsList({ activity, styles }: any) {
    const { t } = useTranslation(['activities']);
    const { colors } = useTheme();
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            <Text style={styles.title}>{t('activityDetails.title')}</Text>

            <View>
                <View style={styles.row}>
                    <Text style={styles.label}>{t('activityDetails.driverName')}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={styles.value}>{activity.driverName}</Text>
                        <TouchableOpacity onPress={() => setIsFavorite(prev => !prev)}>
                            <HeartIcon
                                width={20}
                                height={20}
                                fill={isFavorite ? colors.error : 'none'}
                                stroke={isFavorite ? colors.error : colors.textSecondary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>{t('activityDetails.rideType')}</Text>
                    <Text style={styles.value}>{activity.rideType}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>{t('activityDetails.date')}</Text>
                    <Text style={styles.value}>{activity.date}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>{t('activityDetails.distance')}</Text>
                    <Text style={styles.value}>
                        {activity.distance !== null ? `${activity.distance} km` : '-'}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>{t('activityDetails.duration')}</Text>
                    <Text style={styles.value}>
                        {activity.duration !== null ? `${activity.duration} min` : '-'}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>{t('activityDetails.price')}</Text>
                    <Text style={styles.value}>
                        {activity.price !== null ? `${activity.price} $` : '-'}
                    </Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>{t('activityDetails.pickupLocation')}</Text>
            <Text style={styles.location}>{activity.pickupLocation}</Text>

            <Text style={styles.sectionTitle}>{t('activityDetails.dropoffLocation')}</Text>
            <Text style={styles.location}>{activity.dropoffLocation}</Text>
        </ScrollView>
    );
}