import { StyleSheet } from 'react-native';

import { ThemeColors } from '../../../core/theme/theme.types';
import {
    Radius,
    Spacing,
    Typography,
} from '../../../core/theme/tokens';

export const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        sheetContent: {
            flex: 1,
            paddingHorizontal: Spacing.xl,
        },

        scrollContent: {
            paddingBottom: Spacing.xxl,
        },
        sheetBackground: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
        },
        handleIndicatorStyle: {
            backgroundColor: colors.textMuted,
            width: 50,
        },
        title: {
            ...Typography.h2,
            color: colors.primary,
            marginBottom: Spacing.xl,
            textAlign: 'center',
        },

        sheetContainer: {
            flex: 1,
            width: '100%',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            overflow: 'hidden',
        },

        sheetTransparent: {
            backgroundColor: 'transparent',
        },

        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: Spacing.sm,
            borderBottomWidth: 1,
            borderBottomColor: colors.surface,
        },

        label: {
            ...Typography.body,
            color: colors.textSecondary,
        },

        value: {
            ...Typography.boldBody,
            color: colors.primary,
        },

        sectionTitle: {
            ...Typography.boldBody,
            color: colors.primary,
            marginTop: Spacing.xl,
            marginBottom: Spacing.sm,
        },

        location: {
            ...Typography.body,
            color: colors.textSecondary,
            marginBottom: Spacing.md,
            lineHeight: 22,
        },

        buttonsRow: {
            flexDirection: 'row',
            gap: Spacing.md,
            marginTop: Spacing.xxl,
        },

        reviewButton: {
            flex: 1,
            backgroundColor: colors.surface,
            borderRadius: Radius.lg,
            paddingVertical: Spacing.md,
            alignItems: 'center',
        },

        reviewText: {
            ...Typography.boldBody,
            color: colors.primary,
        },

        rerideButton: {
            flex: 1,
            backgroundColor: colors.primary,
            borderRadius: Radius.lg,
            paddingVertical: Spacing.md,
            alignItems: 'center',
        },

        rerideText: {
            ...Typography.boldBody,
            color: colors.background,
        },
    });