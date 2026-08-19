import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import HeartIcon from '../../../../assets/svg/common/heart.svg';
import { useTheme } from '../../../../core/theme/useTheme';

export default function ActivityDetailsList({ activity, styles, toggleFavorite }: any) {
    const { t } = useTranslation(['activities']);
    const { colors } = useTheme();

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
                        {activity.driverId !== null && (
                            <TouchableOpacity onPress={() => toggleFavorite(activity.driverId)}>
                                <HeartIcon
                                    width={20}
                                    height={20}
                                    fill={activity.isFavorite ? colors.error : 'none'}
                                    stroke={activity.isFavorite ? colors.error : colors.textSecondary}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>{t('activityDetails.vehicle')}</Text>
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

                {activity.stops
                    .filter((stop: any) => stop.stop_type === 'STOP')
                    .map((stop: any, index: number) => (
                        <View style={styles.row} key={stop.id ?? `${stop.address}-${index}`}>
                            <Text style={styles.label}>
                                {t('activityDetails.stop')} {index + 1}
                            </Text>
                            <Text style={styles.value}>{stop.address}</Text>
                        </View>
                    ))}
            </View>

            <Text style={styles.sectionTitle}>{t('activityDetails.pickupLocation')}</Text>
            <Text style={styles.location}>{activity.pickupLocation}</Text>

            <Text style={styles.sectionTitle}>{t('activityDetails.dropoffLocation')}</Text>
            <Text style={styles.location}>{activity.dropoffLocation}</Text>
        </ScrollView>
    );
}