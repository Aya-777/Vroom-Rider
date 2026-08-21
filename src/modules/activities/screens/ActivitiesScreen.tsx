import React from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import ActivityCard from '../components/ActivityCard';
import LinearBg from '../../../shared/components/LinearBg';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/activities.styles';
import { useActivitiesViewModel } from '../viewmodels/useActivitiesViewModel';
import StatusTabs from '../components/StatusTabs';
import { useTranslation } from 'react-i18next';
import Header from '../../../shared/components/Header';
import { navigate } from '../../../navigation/rootTypes';
import ActivityDetailsSheet from '../components/ActivityDetailsSheet';
import ReviewModal from '../../review/components/ReviewModal';
import { RideState } from '../../ride/types/RideState';
import { useNavigation } from '@react-navigation/native';

export default function ActivitiesScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['activities']);
  const navigation = useNavigation<any>();
  const mainTabsNavigation = navigation.getParent();

  const vm = useActivitiesViewModel();



  const handleToggleFavorite = async (driverId: number) => {
    const isFavorite = await vm.toggleFavoriteDriver(driverId);

    vm.setSelectedActivity(previous =>
      previous && previous.driverId === driverId
        ? { ...previous, isFavorite }
        : previous,
    );

  };

  const handleReride = async () => {
    if (!vm.selectedActivity) return;

    const result = await vm.onReride(vm.selectedActivity.id);

    if (!result.success) {
      return;
    }

    const newTrip = result.trip;

    console.log('New trip ID:', newTrip?.id);

    // close bottom sheet
    vm.setDetailsVisible(false);
    // then navigate to the appropriate screen
    mainTabsNavigation.navigate('HomeTab', {
        screen: 'Ride',
      },
    );
    vm.setRideState(RideState.SEARCHING_FOR_DRIVER);
  };

  return (
    <LinearBg
      colors={[colors.backgroundSoft, colors.background]}
      style={styles.gradientContainer}
    >
      <Header
        title={t('yourActivity')}
        onNotificationPress={() => navigate('Notifications')}
        onMenuPress={vm.openSidebar}
      />

      <View style={styles.container}>
        <StatusTabs
          statuses={vm.statuses}
          selectedStatus={vm.selectedStatus}
          onSelect={vm.setSelectedStatus}
          styles={styles}
        />

        <FlatList
          data={vm.activities}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.4}
          onEndReached={vm.loadMore}
          renderItem={({ item }) => (
            <ActivityCard
              rideType={item.rideType}
              status={item.displayStatus}
              pickup={item.pickupLocation}
              destination={item.dropoffLocation}
              date={item.date}
              fare={
                item.price !== null ? `${item.price.toFixed(2)} ${item.currency}` : '-'
              }
              distance={
                item.distance !== null ? `${item.distance.toFixed(3)} km` : undefined
              }
              onPress={() => {
                vm.setSelectedActivity(item);
                vm.setDetailsVisible(true);
                
              }}
            />
          )}
          ListFooterComponent={
            vm.isLoadingMore ? (
              <ActivityIndicator
                style={styles.loadingMoreIndicator}
                color={colors.primary}
              />
            ) : null
          }
          ListEmptyComponent={
            !vm.isLoading ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>{t('noActivities')}</Text>
              </View>
            ) : (
              <ActivityIndicator
                style={styles.emptyLoadingIndicator}
                color={colors.primary}
              />
            )
          }
        />
        <ActivityDetailsSheet
          visible={vm.detailsVisible}
          activity={vm.selectedActivity}
          onClose={() => vm.setDetailsVisible(false)}
          onReview={() => {
            vm.setDetailsVisible(false);
            vm.setReviewVisible(true);
          }}
          onReride={handleReride}
          toggleFavorite={handleToggleFavorite}
          onCancel={vm.cancelActivity}
        />
        <ReviewModal
          isVisible={vm.reviewVisible}
          setIsVisible={vm.setReviewVisible}
          rideId={Number(vm.selectedActivity?.id)}
        />
      </View>
    </LinearBg>
  );
}




