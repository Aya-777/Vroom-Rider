import PaymentIcon from '../../../assets/svg/payment/price.svg';
import SystemIcon from '../../../assets/svg/common/notifications.svg';
import RideIcon from '../../../assets/svg/common/ride.svg';
import { ThemeColors } from '../../../core/theme/theme.types';

type NotificationAppearance = {
    Icon: React.ElementType;
    color: string;
    backgroundColor: string;
};

export const getNotificationIcon = (
    type: string,
    colors: ThemeColors,
): NotificationAppearance => {

    switch (type) {

        case 'TRIP_REQUEST':
        case 'TRIP_ACCEPTED':
        case 'DRIVER_ARRIVED':
        case 'TRIP_STARTED':
        case 'SCHEDULED_TRIP_ACCEPTED':
            return {
                Icon: RideIcon,
                color: colors.primary,
                backgroundColor: colors.primary + '15',
            };

        case 'TRIP_COMPLETED':
        case 'PAYMENT_CONFIRMED':
            return {
                Icon: PaymentIcon,
                color: colors.success,
                backgroundColor: colors.success + '15',
            };

        case 'TRIP_CANCELLED':
        case 'TRIP_NO_DRIVER_FOUND':
        case 'SAFETY_ALERT':
            return {
                Icon: RideIcon,
                color: colors.error,
                backgroundColor: colors.error + '15',
            };

        case 'COMPLAINT_RECEIVED':
        case 'CONTACT_US_RECEIVED':
        case 'SCHEDULED_TRIP_REMINDER':
            return {
                Icon: SystemIcon,
                color: colors.textSecondary,
                backgroundColor: colors.primary + '15',
            };

        default:
            return {
                Icon: SystemIcon,
                color: colors.textSecondary,
                backgroundColor: colors.primary + '15',
            };
    }
};
