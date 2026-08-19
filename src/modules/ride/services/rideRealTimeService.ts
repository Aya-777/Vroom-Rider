import { PusherEvent } from '@pusher/pusher-websocket-react-native';
import { useRideStore } from '../store/useRideStore';
import { RideState, TripStatus } from '../types/RideState';
import { rideApi } from './rideApi';

class RideRealtimeService {
  handleEvent(event: PusherEvent) {
    try {
      const data = JSON.parse(event.data);

      console.log('[RideRealtime] Event:', event.eventName);
      console.log('[RideRealtime] Data:', data);

      switch (event.eventName) {
        case 'trip.search.failed':
          this.handleSearchFailed(data);
          break;

        case 'trip.driver.assigned':
          this.handleDriverAssigned(data);
          break;

        case 'trip.driver.arrived':
          this.handleDriverArrived(data);
          break;

        case 'trip.started':
          this.handleTripStarted(data);
          break;

        case 'trip.completed':
          this.handleTripCompleted(data);
          break;

        case 'trip.cancelled':
          this.handleTripCancelled(data);
          break;

        case 'trip.driver.location.updated':
          this.handleDriverLocation(data);
          break;

        case 'safety.alert.created':
          this.handleSOSVisible(data);
          break;

        default:
          console.log('[RideRealtime] Unhandled event:', event.eventName);
      }
    } catch (error) {
      console.error('[RideRealtime] Failed to handle event:', error);
    }
  }

  private async handleSearchFailed(data: { trip_id: number; status: string }) {
    const { currentRide, setCurrentRide, setRideState, clearRide } =
      useRideStore.getState();

    if (!currentRide) {
      console.warn('[RideRealtime] No current ride found');
      return;
    }

    if (currentRide.id !== data.trip_id) {
      console.warn(
        '[RideRealtime] Event belongs to another trip:',
        data.trip_id,
      );
      return;
    }

    setCurrentRide({
      ...currentRide,
      idempotency_key: '',
    });
    setRideState(RideState.NO_DRIVER_FOUND);
  }

  private async handleDriverAssigned(data: {
    trip_id: number;
    driver_id: number;
    driver_name: string;
    status: string;
  }) {
    const {
      currentRide,
      setCurrentRide,
      setRideState,
      setDriverLocation,
      driverLocation,
    } = useRideStore.getState();

    if (!currentRide) {
      console.warn('[RideRealtime] No current ride found');
      return;
    }

    if (currentRide.id !== data.trip_id) {
      console.warn(
        '[RideRealtime] Event belongs to another trip:',
        data.trip_id,
      );
      return;
    }

    try {
      // Wait for the backend to give us the complete trip
      const trip = await rideApi.getTripById(currentRide.id);

      console.log('[RideRealtime] Full trip:', trip);
      // Update currentRide FIRST
      setCurrentRide({
        ...currentRide,
        status: data.status as TripStatus,
        driver: trip.data.driver,
        vehicle: trip.data.vehicle,
      });

      // Get driver location
      const location = await rideApi.getDriverLocation(data.trip_id);

      console.log('[RideRealtime] Driver location:', location);

      // Save it in Zustand
      setDriverLocation({
        latitude: location.data.latitude,
        longitude: location.data.longitude,
      });

      // Only AFTER currentRide has been updated
      setRideState(RideState.DRIVER_FOUND);
    } catch (error) {
      console.error('[RideRealtime] Failed to fetch trip details:', error);
    }
  }

  private handleDriverArrived(data: {
    trip_id: number;
    status: TripStatus;
    pin: string;
  }) {
    const { setRideState, currentRide, setCurrentRide } =
      useRideStore.getState();

    if (!currentRide) {
      console.warn('[RideRealtime] No current ride found');
      return;
    }

    if (currentRide.id !== data.trip_id) {
      console.warn(
        '[RideRealtime] Event belongs to another trip:',
        data.trip_id,
      );
      return;
    }

    setCurrentRide({
      ...currentRide,
      pin: data.pin,
      status: data.status,
    });

    setRideState(RideState.DRIVER_ARRIVED);
  }

  private handleTripStarted(data: { trip_id: number; status: string }) {
    const { setRideState, currentRide, setCurrentRide } =
      useRideStore.getState();

    if (!currentRide) {
      console.warn('[RideRealtime] No current ride found');
      return;
    }

    if (currentRide.id !== data.trip_id) {
      console.warn(
        '[RideRealtime] Event belongs to another trip:',
        data.trip_id,
      );
      return;
    }

    setCurrentRide({
      ...currentRide,
      status: data.status as TripStatus,
    });

    setRideState(RideState.TRIP_STARTED);
  }

  private async handleTripCompleted(data: { trip_id: number; status: string }) {
    const { setRideState, currentRide, setCurrentRide, setDriverLocation } =
      useRideStore.getState();

    if (!currentRide) {
      console.warn('[RideRealtime] No current ride found');
      return;
    }

    if (currentRide.id !== data.trip_id) {
      console.warn(
        '[RideRealtime] Event belongs to another trip:',
        data.trip_id,
      );
      return;
    }
    const trip = await rideApi.getTripById(data.trip_id);

    console.log(trip.actual_price);

    setCurrentRide({
      ...currentRide,
      status: data.status as TripStatus,
      actual_price: trip.actual_price,
      actual_distance: trip.actual_distance,
      actual_duration: trip.actual_duration,
    });

    setRideState(RideState.TRIP_ENDED);
    setDriverLocation(null);
  }

  private handleTripCancelled(data: { trip_id: number; status: string }) {
    const { currentRide, clearRide, setCurrentRide, setRideState, setDriverLocation } =
      useRideStore.getState();

    if (!currentRide) {
      return;
    }

    if (currentRide.id !== data.trip_id) {
      return;
    }

    setRideState(RideState.SELECT_RIDE);
    clearRide();
    setCurrentRide(null);
    setDriverLocation(null);
  }

  private handleDriverLocation(data: {
    trip_id: number;
    driver_id: number;
    latitude: number;
    longitude: number;
  }) {
    const {
      currentRide,
      setDriverLocation,
    } = useRideStore.getState();

    if (!currentRide) {
      console.warn('[RideRealtime] No current ride found');
      return;
    }

    if (currentRide.id !== data.trip_id) {
      console.warn(
        '[RideRealtime] Event belongs to another trip:',
        data.trip_id,
      );
      return;
    }
    console.log("driver location updated");

    setDriverLocation({
      latitude: data.latitude,
      longitude: data.longitude,
    });
  }

  private async handleSOSVisible(data: {
    alert_id: number, trip_id: number, alert_type: string
  }){
    const {setSOSVisible, setSOSAlertId} = useRideStore.getState();
    setSOSVisible(true);
    setSOSAlertId(data.alert_id);
    
  }
}

export const rideRealtimeService = new RideRealtimeService();
