import RideIcon from '../../../assets/svg/common/ride.svg';
import NotificationIcon from '../../../assets/svg/common/notifications.svg';
import CreditCardIcon from '../../../assets/svg/payment/creditcard.svg';

export const getNotificationIcon = (type: string) => {
    switch (type) {
        case 'ride':
            return RideIcon;

        case 'payment':
            return CreditCardIcon;

        case 'promotion':
            return NotificationIcon;

        case 'system':
        default:
            return NotificationIcon;
    }
};