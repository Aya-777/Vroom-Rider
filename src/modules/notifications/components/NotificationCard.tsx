import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import LinearBg from '../../../shared/components/LinearBg';
import { useTheme } from '../../../core/theme/useTheme';

import { createStyles } from '../styles/notifications.styles';
import { NotificationCardProps } from '../types/notifications.types';
import { getNotificationIcon } from '../utils/notificationIcon';

const NotificationCard = ({
    notification,
    onPress,
}: NotificationCardProps) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    const { Icon, color }  = getNotificationIcon(notification.type , colors);

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPress?.(notification.trip_id)}
        >
            <LinearBg
                colors={[colors.background, colors.backgroundSoft]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0}}
                style={styles.container}
            >
                <View style={styles.iconWrapper}>
                    <Icon
                        width={24}
                        height={24}
                        fill={color}
                    />

                    {!notification.isRead && (
                        <View style={styles.unreadDot} />
                    )}
                </View>

                <Text style={styles.title}>
                    {notification.title}
                </Text>

                <Text style={styles.body}>
                    {notification.body}
                </Text>

                <View style={styles.footer}>
                    <Text style={styles.time}>
                        {notification.created_at}
                    </Text>
                </View>
            </LinearBg>
        </TouchableOpacity>
    );
};

export default NotificationCard;