import { StyleSheet } from 'react-native';
import { Typography, Radius, Shadows } from '../../../core/theme/tokens';
import { ThemeColors } from '../../../core/theme/theme.types';

export const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },

        error: {
            color: 'red',
            textAlign: 'center',
            marginBottom: 10,
        },

        scrollContent: {
            flexGrow: 1,
            alignItems: 'center',
            paddingBottom: 120,
        },

        top: {
            alignItems: 'center',
            marginTop: 40,
            marginBottom: 30,
        },

        avatarWrapper: {
            position: 'relative',
        },

        avatarCircle: {
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: colors.primary + '20',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        },

        avatarImage: {
            width: '100%',
            height: '100%',
        },

        cameraBadge: {
            position: 'absolute',
            bottom: 4,
            right: 4,
            width: 34,
            height: 34,
            borderRadius: Radius.full,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: colors.backgroundSoft,
            ...Shadows.small,
        },

        middle: {
            width: '100%',
            alignItems: 'center',
            gap: 12,
        },

        inputBox: {
            width: '80%',
        },

        input: {
            flex: 1,
            marginStart: 12,
            ...Typography.body,
            color: colors.textPrimary,
        },

        bottom: {
            marginTop: 25,
            alignItems: 'center',
        },

        button: {
            width: 290,
            height: 60,
            borderRadius: Radius.md,
            justifyContent: 'center',
            alignItems: 'center',
        },

        btnText: {
            ...Typography.h3,
            color: colors.backgroundSoft,
        },
    });