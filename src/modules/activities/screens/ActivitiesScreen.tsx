import React from 'react';
import { View, FlatList, Text } from 'react-native';
import ActivityCard from '../components/ActivityCard';

import LinearBg from '../../../shared/components/LinearBg';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/activities.styles';
import { useActivitiesViewModel } from '../viewmodels/useActivitiesViewModel';
import StatusTabs from '../components/StatusTabs';
import { useTranslation } from 'react-i18next';
import Header  from '../../../shared/components/Header';

export default function ActivitiesScreen() {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const { t } = useTranslation(['activities']);

    const {
        statuses,
        selectedStatus,
        setSelectedStatus,
        activities,
        isLoading,
    } = useActivitiesViewModel();

    return (
        <LinearBg
            colors={[colors.backgroundSoft, colors.background]}
            style={styles.gradientContainer}
        >

            <Header title={t('trackYourTrip')} />

            <View style={styles.container}>
                <StatusTabs
                    statuses={statuses}
                    selectedStatus={selectedStatus}
                    onSelect={setSelectedStatus}
                    styles={styles}
                />

                <FlatList
                    data={activities}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ActivityCard
                            rideType={item.rideType}
                            pickup={item.pickup}
                            destination={item.destination}
                            date={item.date}
                            fare={item.fare}
                            distance={item.distance}
                            onPress={() => { }}
                        />
                    )}
                    ListEmptyComponent={
                        !isLoading ? (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>
                                    {t('noActivities')}
                                </Text>
                            </View>
                        ) : null
                    }
                />
            </View>
        </LinearBg>
    );
}