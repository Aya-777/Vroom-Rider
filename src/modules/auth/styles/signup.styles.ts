import { StyleSheet } from 'react-native';

import {
    Typography,
    Radius,
} from '../../../core/theme/tokens';

export const createStyles = (colors: any) =>
    StyleSheet.create({
        signupWrapper: {
            width: 500,
            height: 650,
            position: 'relative',
        },

        pinShape: {
            position: 'absolute',
            top: -25,
            left: -25,
        },

        signupContent: {
            position: 'absolute',
            top: 60,
            left: 0,
            right: 0,

            paddingHorizontal: 24,
        },

        container: {
            flex: 1,
        },

        text: {
            ...Typography.caption,
        },

        link: {
            ...Typography.boldCaption,
        },
        top: {
            alignItems: 'center',
            marginBottom: 30,
        },

        middle: {
            width: '100%',
            alignItems: 'center',
            gap: 12,
        },

        inputBox: {
            width: 300,
            height: 55,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            borderRadius: 12,
            borderColor: colors.surface,
            borderWidth: 2,
            backgroundColor: colors.backgroundSoft + '80',
        },

        input: {
            flex: 1,
            marginLeft: 12,
            ...Typography.body,
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
        },
        wrapper: {
            width: '90%',
            maxWidth: 348,
            aspectRatio: 348 / 520,
            overflow: 'hidden',
        },

        background: {
            ...StyleSheet.absoluteFill,
        },

        content: {
            flex: 1,
            paddingTop: 35,
            paddingHorizontal: 24,
        },

        flex: {
            flex: 1,
        },
        gradient: { flex: 1 },


        scroll: {
            alignItems: 'center',
            paddingBottom: 40
        },

        bgCircle: {
            position: 'absolute',
            width: 700,
            height: 900,
            borderRadius: 350,
            left: -280,
            top: -30,
        },

        title: {
            marginTop: 50,
            fontSize: 32,
            fontFamily: 'Lora-Bold',
            color: colors.textMuted
        },

        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 290,
        },

        halfInput: {
            width: 143,
            height: 55,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            borderRadius: 12,
            borderColor: colors.surface,
            borderWidth: 2,
            backgroundColor: colors.backgroundSoft + '80',
        },

        halfInputText: {
            flex: 1,
            marginLeft: 8,
            ...Typography.body,
        },

        footerContainer: {
            alignItems: 'center',
            marginTop: 20,
        },

        footerText: {
            ...Typography.caption,
        },

        footerLink: {
            ...Typography.boldCaption,
        },

        linksRow: {
            flexDirection: 'row',
            marginTop: 4,
        },

        logoWrapper: {
            position: 'relative',
            alignSelf: 'center',
        },

        cameraButton: {
            position: 'absolute',
            right: -2,
            bottom: 10,
        },

        cameraCircle: {
            width: 32,
            height: 32,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: colors.primary,
            backgroundColor: colors.surface,
        },
    });