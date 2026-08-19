import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { ActivityCardProps, LocationRowProps } from './ActivityCard.types';
import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from './ActivityCard.styles';
import PickupIcon from '../../../../assets/svg/common/myLocation.svg';
import DropoffIcon from '../../../../assets/svg/common/pin.svg';
import TrashIcon from '../../../../assets/svg/common/trash.svg';
import LinearBg from '../../../../shared/components/LinearBg';


const LocationRow = ({
    isDestination,
    text,
    styles,
}: LocationRowProps) => {

    return (
        <View style={styles.locationRow}>
            {isDestination
                ? <DropoffIcon />
                : <PickupIcon />
            }

            <Text
                style={styles.locationText}
                numberOfLines={1}
            >
                {text}
            </Text>
        </View>
    );
};

const ActivityCard = ({
    rideType,
    status,
    pickup,
    destination,
    date,
    fare,
    distance,
    onPress,
    onDelete,
}: ActivityCardProps) => {

    const { colors } = useTheme();
    const { t } = useTranslation(['activities']);
    const styles = createStyles(colors);

    const statusColor = {
        Completed: colors.success,
        Cancelled: '#EAB308',
        Rejected: colors.error,
        Pending: '#F97316',
        Scheduled: '#F97316',
    }[status];

    return (

        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <LinearBg
                colors={[colors.background, colors.backgroundSoft]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.container}
            >
                <View style={styles.header}>
                    <View style={styles.headerInfo}>
                        <Text style={styles.rideType}>
                            {rideType}
                        </Text>
                        <Text style={[styles.status, { color: statusColor }]}>
                            {t(`status.${status.toLowerCase()}`)}
                        </Text>
                    </View>

                    <Text style={styles.fare}>
                        {fare}
                    </Text>
                </View>

                <View style={styles.locations}>
                    <LocationRow
                        text={pickup}
                        styles={styles}
                    />

                    <LocationRow
                        text={destination}
                        isDestination
                        styles={styles}
                    />
                </View>

                <View style={styles.footer}>
                    <View style={styles.footerLeft}>
                        <Text style={styles.date}>{date}</Text>
                    </View>

                    <View>
                        {distance && (
                            <Text style={styles.distance}>{distance}</Text>
                        )}
                    </View>

                    {/* <TouchableOpacity
                        onPress={onDelete}
                        activeOpacity={0.7}
                        style={styles.deleteButton}
                    >
                        <TrashIcon fill={colors.error} />
                    </TouchableOpacity> */}
                </View>
            </LinearBg>
        </TouchableOpacity >
    );
};

export default ActivityCard;