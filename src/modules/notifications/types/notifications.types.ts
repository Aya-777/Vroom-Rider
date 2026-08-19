export type NotificationType =
  | 'TRIP_REQUEST'
  | 'TRIP_ACCEPTED'
  | 'DRIVER_ARRIVED'
  | 'TRIP_STARTED'
  | 'TRIP_COMPLETED'
  | 'TRIP_NO_DRIVER_FOUND'
  | 'TRIP_CANCELLED'
  | 'COMPLAINT_RECEIVED'
  | 'CONTACT_US_RECEIVED'
  | 'SAFETY_ALERT'
  | 'PAYMENT_CONFIRMED'
  | 'SCHEDULED_TRIP_REMINDER'
  | 'SCHEDULED_TRIP_ACCEPTED'
  | 'ride'
  | 'payment'
  | 'promotion'
  | 'system';

export interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  body: string;
  trip_id: number | null;
  is_read: boolean;
  created_at: string;
}

export type NotificationCardProps = {
  notification: NotificationItem;
  onPress?: (tripId: number | null) => void;
  onMarkAsRead?: () => void;
  onDelete?: () => void;
};
