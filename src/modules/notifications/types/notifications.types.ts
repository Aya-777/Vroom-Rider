export type NotificationType =
  | 'ride'
  | 'payment'
  | 'promotion'
  | 'system'
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
  | 'SCHEDULED_TRIP_ACCEPTED';

export interface NotificationItem {
  id: string;
  user_id: string;
  trip_id: string | null;
  title: string;
  body: string;
  type: NotificationType;
  created_at: string;
  isRead?: boolean;
}

export type NotificationCardProps = {
  notification: NotificationItem;
  onPress?: (tripId: string | null) => void;
  onMarkAsRead?: () => void;
  onDelete?: () => void;
};
