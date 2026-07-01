import { StyleSheet } from 'react-native';

import { ThemeColors } from '../../../core/theme/theme.types';
import {
    Spacing,
    Typography,
    Radius,
} from '../../../core/theme/tokens';

export const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        gradientContainer: {
            flex: 1,
        },

        // container: {
        //     flex: 1,
        //     // padding: Spacing.lg,
        //     // borderRadius: Radius.lg,

        // },


        scrollContent: {
            flexGrow: 1,
            paddingBottom: Spacing.xl,
        },

        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: Spacing.xxl,
            gap: Spacing.md,
        },

        emptyText: {
            ...Typography.body,
            color: colors.primary,
            textAlign: 'center',
        },

        container: {
            borderRadius: Radius.lg,
            padding: 18,
            marginBottom: 16,
            overflow: 'hidden',
        },

        iconWrapper: {
            width: 45,
            height: 45,
            borderRadius: Radius.lg,
            backgroundColor: colors.primary + '15',
            justifyContent: 'center',
            alignItems: 'center',
            // marginBottom: 16,
            alignSelf: 'flex-start',
        },

        unreadDot: {
            position: 'absolute',
            top: 0,
            right: 0,
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: colors.primary,
        },

        title: {
            fontSize: 16,
            fontFamily: 'Lora-SemiBold',
            color: colors.textPrimary,
            marginBottom: 8,
        },

        body: {
            fontSize: 14,
            fontFamily: 'Lora-Regular',
            color: colors.textSecondary,
            lineHeight: 22,
        },

        footer: {
            marginTop: 18,
            alignItems: 'flex-end',
        },

        time: {
            fontSize: 12,
            fontFamily: 'Lora-Regular',
            color: colors.textPrimary,
        },
    });