import { StyleSheet } from "react-native";

export const createStyles = () =>
    StyleSheet.create({
        overlay: {
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.45)',
        },
        sheet: {
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 34,
        },
        handle: {
            width: 40,
            height: 4,
            borderRadius: 2,
            alignSelf: 'center',
            marginBottom: 16,
            opacity: 0.4,
        },
        option: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 14,
            gap: 12,
        },
        optionText: {
            fontSize: 16,
            fontFamily: 'Lora-SemiBold',
        },
    });