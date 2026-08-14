import { useCallback, useEffect, useRef, useState } from 'react';
import { useMainDrawer } from '../../../navigation/hooks/useMainDrawer';
import {
  getTripHistory,
  getTripHistoryByUrl,
  rideApi,
} from '../../ride/services/rideApi';
import { TripHistoryItemDTO } from '../../ride/services/dto/tripHistory.dto';
import { Activity, ActivityFilterTab } from '../types/activities.types';
import {
  ACTIVITY_TABS,
  STATUS_PARAM_BY_TAB,
} from '../constants/activitiesData';
import { toDisplayStatus } from '../constants/activitiesData';
import { useFavoriteDriversStore } from '../../favoriteDrivers/store/useFavoriteDriversStore';
import { useRideStore } from '../../ride/store/useRideStore';
import { CurrentRide, RideParams } from '../../ride/types/ride.types';

const mapTripToActivity = (trip: TripHistoryItemDTO): Activity => {
  const pickup = trip.stops.find(s => s.stop_type === 'PICKUP');
  const dropoff = trip.stops.find(s => s.stop_type === 'DROP_OFF');
  const dateSource = trip.ended_at ?? trip.cancelled_at ?? trip.requested_at;

  return {
    id: String(trip.id),
    rawStatus: trip.status,
    displayStatus: toDisplayStatus(trip.status),
    pickupLocation: pickup?.address ?? '',
    dropoffLocation: dropoff?.address ?? '',
    date: new Date(dateSource).toLocaleString(),
    price: trip.price ? Number(trip.price) : null,
    currency: 'SP',
    driverId: trip.driverId,
    driverName: trip.driver_name ?? '-',
    isFavorite: trip.isFavorite,
    rideType: trip.vehicle_type ?? '-',
    distance: trip.distance,
    duration: trip.duration,
    cancellationReason: trip.cancellation_reason,
  };
};

export const useActivitiesViewModel = () => {
  const { openSidebar } = useMainDrawer();

  const [selectedStatus, setSelectedStatus] =
    useState<ActivityFilterTab>('All');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toggleFavorite } = useFavoriteDriversStore();
  const { setCurrentRide, setEstimate, setRideDetails, getIdempotencyKey, setRideState } = useRideStore();

  const nextUrlRef = useRef<string | null>(null);

  const loadInitial = useCallback(async (tab: ActivityFilterTab) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTripHistory({
        status: STATUS_PARAM_BY_TAB[tab],
      });
      // console.log(response.results);
      setActivities(response.results.map(mapTripToActivity));
      nextUrlRef.current = response.next;
    } catch (e) {
      setError(
        'Failed to load activities' +
          (e instanceof Error ? `: ${e.message}` : ''),
      );
      setActivities([]);
      nextUrlRef.current = null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitial(selectedStatus);
  }, [selectedStatus, loadInitial]);

  const loadMore = useCallback(async () => {
    if (!nextUrlRef.current || isLoadingMore || isLoading) return;

    setIsLoadingMore(true);
    try {
      const response = await getTripHistoryByUrl(nextUrlRef.current);
      setActivities(prev => [
        ...prev,
        ...response.results.map(mapTripToActivity),
      ]);
      nextUrlRef.current = response.next;
    } catch (e) {
      setError(
        'Failed to load more activities' +
          (e instanceof Error ? `: ${e.message}` : ''),
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, isLoading]);

  const onReride = useCallback(
    async (tripId: string) => {
      try {
        setError(null);
        const idempotencyKey = getIdempotencyKey();
        const response = await rideApi.reorderTrip(
          Number(tripId),
          idempotencyKey,
        );
        const trip = response.data;

        setCurrentRide({
          ...trip,
          vehicle_type_id: trip.vehicle_type_id.toString(),
        } as CurrentRide);
        setRideDetails({
          ...trip,
          vehicle_type_id: trip.vehicle_type_id.toString(),
          passenger_contact_phone: trip.passenger_contact_phone ?? undefined,
        } as RideParams);

        setEstimate({
          estimated_distance_km: trip.estimated_distance,
          estimated_duration_minutes: trip.estimated_duration,
          pricing_tiers: [],
          stops: trip.stops,
          route_geometry: trip.estimated_route_geometry.map(
            ([longitude, latitude]: [number, number]) => ({
              longitude,
              latitude,
            }),
          ),
        });

        return {
          success: true,
          trip,
        };
      } catch (e) {
        console.error('Failed to reorder trip:', e);

        const message =
          e instanceof Error ? e.message : 'Failed to reorder trip';

        setError(message);

        return {
          success: false,
          trip: null,
        };
      }
    },
    [setCurrentRide, setEstimate, setRideDetails],
  );

  return {
    statuses: ACTIVITY_TABS,
    selectedStatus,
    setSelectedStatus,
    activities,
    isLoading,
    isLoadingMore,
    error,
    loadMore,
    openSidebar,
    toggleFavorite,
    onReride,
    setRideState
  };
};
