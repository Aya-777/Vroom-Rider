import RideIcon from '../../../assets/svg/common/ride.svg';
import PaymentIcon from '../../../assets/svg/payment/cash.svg';
import SystemIcon from '../../../assets/svg/common/notifications.svg';
import PromotionIcon from '../../../assets/svg/common/star.svg';
import { NotificationType } from '../types/notifications.types';
import { ThemeColors } from '../../../core/theme/theme.types';

type NotificationAppearance = {
    Icon: React.ElementType;
    color: string;
};

export const getNotificationIcon = (
    type: NotificationType,
    colors: ThemeColors,
): NotificationAppearance => {

    switch (type) {

        case 'payment':
            return {
                Icon: PaymentIcon,
                color: colors.success,
            };

        case 'system':
            return {
                Icon: SystemIcon,
                color: '#D4AF37',
            };

        case 'ride':
            return {
                Icon: RideIcon,
                color: colors.textSecondary,
            };

        case 'promotion':
        default:
            return {
                Icon: PromotionIcon,
                color: colors.textSecondary,
            };
    }
};