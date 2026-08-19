import { NotificationType } from '../../types/notifications.types';

export interface NotificationDTO {
  id: number;
  type: NotificationType;
  title: string;
  body: string;
  trip_id: number | null;
  is_read: boolean;
  created_at: string;
}

export interface NotificationsListResponse {
  'status code': number;
  message: string;
  data: NotificationDTO[];
}
