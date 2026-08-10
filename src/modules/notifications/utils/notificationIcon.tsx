import RideIcon from '../../../assets/svg/common/ride.svg';
import SystemIcon from '../../../assets/svg/common/notifications.svg';
import { ThemeColors } from '../../../core/theme/theme.types';

type NotificationAppearance = {
    Icon: React.ElementType;
    color: string;
    backgroundColor: string;
};

// الأنواع الحقيقية القادمة من الباك (من /api/v1/notifications/types/)
export const getNotificationIcon = (
    type: string,
    colors: ThemeColors,
): NotificationAppearance => {

    switch (type) {

        case 'TRIP_REQUEST':
        case 'TRIP_ACCEPTED':
        case 'DRIVER_ARRIVED':
        case 'TRIP_STARTED':
            return {
                Icon: RideIcon,
                color: colors.primary,
                backgroundColor: colors.primary + '15',
            };

        case 'TRIP_COMPLETED':
            return {
                Icon: RideIcon,
                color: colors.success,
                backgroundColor: colors.success + '15',
            };

        case 'TRIP_CANCELLED':
        case 'TRIP_NO_DRIVER_FOUND':
            return {
                Icon: RideIcon,
                color: colors.error,
                backgroundColor: colors.error + '15',
            };

        default:
            return {
                Icon: SystemIcon,
                color: colors.textSecondary,
                backgroundColor: colors.primary + '15',
            };
    }
};
