import { StyleSheet } from 'react-native';

import {
    Typography,
    Radius,
} from '../../../core/theme/tokens';

export const createStyles = (colors: any) =>
    StyleSheet.create({
        container: {
            marginTop: -20,
            alignItems: 'center',
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
            width: 280,
            height: 55,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            borderRadius: 12,
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
        scroll: { alignItems: 'center', paddingBottom: 40 },

        bgCircle: {
            position: 'absolute',
            width: 700,
            height: 900,
            borderRadius: 350,
            left: -280,
            top: -30,
        },

        title: {
            marginTop: 24,
            marginBottom: 10,
            fontSize: 32,
            fontFamily: 'Lora-Bold',
        },
    });