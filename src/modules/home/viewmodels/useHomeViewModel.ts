import { useEffect, useState } from 'react';
import RideIcon from '../../../assets/svg/common/ride.svg';
import ReserveIcon from '../../../assets/svg/home/reserve.svg';
import PinIcon from '../../../assets/svg/common/pin.svg';
import { useTranslation } from 'react-i18next';
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

  const [recentDestinations, setRecentDestinations] = useState<DestinationItem[]>([]);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);

  useEffect(() => {
    let isMounted = true;

    rideApi.getRecentTrips()
      .then((trips: RecentTripDTO[]) => {
        if (!isMounted) return;

        const mapped: DestinationItem[] = trips.map((trip: RecentTripDTO) => ({
          id: String(trip.id),
          title: trip.dropoff_address.split(',')[0],
          subtitle: trip.dropoff_address,
          icon: PinIcon,
          dropoffLatitude: trip.dropoff_latitude,
          dropoffLongitude: trip.dropoff_longitude,
          vehicleTypeId: trip.vehicle_type_id,
        }));

        setRecentDestinations(mapped);
      })
      .catch(() => {
        if (isMounted) setRecentDestinations([]);
      })
      .finally(() => {
        if (isMounted) setIsLoadingRecent(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const services = [
    { id: '1', title: t('ride'), icon: RideIcon, active: true },
    { id: '2', title: t('home:services.reserve'), icon: ReserveIcon, active: false },
  ];

  return {
    services,
    recentDestinations,
    isLoadingRecent,
    openSidebar,
    currentLocation,
  };
};