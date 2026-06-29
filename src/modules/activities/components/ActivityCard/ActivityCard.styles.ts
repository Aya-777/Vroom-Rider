import { StyleSheet } from 'react-native';

import { ThemeColors } from '../../../../core/theme/theme.types';
import {
    Radius,
    Shadows,
    Spacing,
    Typography,
} from '../../../../core/theme/tokens';

export const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            backgroundColor: colors.backgroundSoft,
            borderWidth: 2,
            borderColor: colors.surface,
            borderRadius: Radius.lg,
            padding: Spacing.lg,
            marginHorizontal: Spacing.md,
            marginBottom: Spacing.xs,
            marginTop: Spacing.md,
            ...Shadows.large
        },

        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

            marginBottom: Spacing.md,
        },

        rideType: {
            ...Typography.boldBody,
            color: colors.primary,
        },

        fare: {
            ...Typography.boldBody,
            color: colors.primary,
        },

        locations: {
            gap: Spacing.sm,
            marginBottom: Spacing.md,
        },

        locationRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },

        locationText: {
            flex: 1,

            ...Typography.body,
            color: colors.primary,

            marginLeft: Spacing.sm,
        },

        footer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        date: {
            ...Typography.caption,
            color: colors.textMuted,
        },

        distance: {
            ...Typography.caption,
            color: colors.textMuted,
        },
    });