export type NotificationType =
  | 'TRIP_REQUEST'
  | 'TRIP_ACCEPTED'
  | 'DRIVER_ARRIVED'
  | 'TRIP_STARTED'
  | 'TRIP_COMPLETED'
  | 'TRIP_NO_DRIVER_FOUND'
  | 'TRIP_CANCELLED';

type NotificationData = {
  type?: string;
  trip_id?: string;
};

type NavigateFn = (screen: string, params?: object) => void;

const RIDER_NAVIGATION_MAP: Partial<
  Record<
    NotificationType,
    (data: NotificationData) => { screen: string; params?: object }
  >
> = {
  TRIP_ACCEPTED: data => ({
    screen: 'DriverFoundScreen',
    params: { tripId: data.trip_id },
  }),
  TRIP_CANCELLED: () => ({
    screen: 'RideScreen',
  }),
  TRIP_NO_DRIVER_FOUND: () => ({
    screen: 'SelectRideScreen',
  }),
  DRIVER_ARRIVED: data => ({
    screen: 'DriverArrivedScreen',
    params: { tripId: data.trip_id },
  }),
  TRIP_STARTED: data => ({
    screen: 'TripStartedScreen',
    params: { tripId: data.trip_id },
  }),
  TRIP_COMPLETED: data => ({
    screen: 'TripEndedModal',
    params: { tripId: data.trip_id },
  }),
};

export function handleNotificationNavigation(
  data: NotificationData,
  navigate: NavigateFn,
) {
  const type = (data.type ?? '').toUpperCase() as NotificationType;
  const entry = RIDER_NAVIGATION_MAP[type];

  if (!entry) {
    console.warn('Unhandled notification type:', type);
    return;
  }

  const { screen, params } = entry(data);
  navigate(screen, params);
}
