import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import RideIcon from '../../../assets/svg/common/ride.svg';
import ReserveIcon from '../../../assets/svg/home/reserve.svg';
import PinIcon from '../../../assets/svg/common/pin.svg';
import { useMainDrawer } from '../../../navigation/hooks/useMainDrawer';
import { useLocationTracking } from '../../../core/services/location/useLocationTracking';
import { useLocationStore } from '../../../core/store/locationStore';
import { rideApi } from '../../ride/services/rideApi';
import { RecentTripDTO } from '../../ride/services/dto/recentTrip.dto';
import { DestinationItem } from '../types/home.types';

export const useHomeViewModel = () => {
  const { t } = useTranslation(['common', 'home']);
  const { openSidebar } = useMainDrawer();

  useLocationTracking();

  const currentLocation = useLocationStore(state => state.currentLocation);
  const [recentDestinations, setRecentDestinations] = useState<
    DestinationItem[]
  >([]);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);

  const loadRecentDestinations = useCallback(async () => {
    setIsLoadingRecent(true);

    try {
      const trips: RecentTripDTO[] = await rideApi.getRecentTrips();
      const mapped: DestinationItem[] = trips.map(trip => ({
        id: String(trip.id),
        title: trip.dropoff_address.split(',')[0],
        subtitle: trip.dropoff_address,
        icon: PinIcon,
        dropoffLatitude: trip.dropoff_latitude,
        dropoffLongitude: trip.dropoff_longitude,
        vehicleTypeId: trip.vehicle_type_id,
      }));

      setRecentDestinations(mapped);
    } catch {
      setRecentDestinations([]);
    } finally {
      setIsLoadingRecent(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadRecentDestinations();
    }, [loadRecentDestinations]),
  );

  const services = [
    { id: '1', title: t('ride'), icon: RideIcon, active: true },
    {
      id: '2',
      title: t('home:services.reserve'),
      icon: ReserveIcon,
      active: false,
    },
  ];

  return {
    services,
    recentDestinations,
    isLoadingRecent,
    openSidebar,
    currentLocation,
    refreshRecentDestinations: loadRecentDestinations,
  };
};
