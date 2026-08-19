import { createStyles } from './ActivityCard.styles';

import { DisplayStatus } from '../../types/activities.types';

export interface ActivityCardProps {
    rideType: string;
    status: DisplayStatus;
    pickup: string;
    destination: string;
    date: string;
    fare: string;
    distance?: string;
    onPress?: () => void;
    onDelete?: () => void;
}

export interface LocationRowProps {
    isDestination?: boolean;
    text: string;
    styles: ReturnType<typeof createStyles>;

}