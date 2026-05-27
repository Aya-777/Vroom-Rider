import { StyleSheet } from 'react-native';
// import { Spacing } from '../../../core/theme/tokens';

export const createStyles = (_colors: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },

        scrollContent: {
            paddingBottom: 150,
        },

        // // Grid wrapper فقط (بدون card styles)
        // gridContainer: {
        //     flexDirection: 'row',
        //     flexWrap: 'wrap',
        //     justifyContent: 'space-between',
        //     paddingHorizontal: Spacing.md,
        // },

        // // List wrapper فقط
        // listContainer: {
        //     paddingHorizontal: Spacing.md,
        //     marginTop: Spacing.md,
        // },

        // // Promo spacing فقط (لو بدك تتحكم بالمكان)
        // promoWrapper: {
        //     marginHorizontal: Spacing.md,
        //     marginTop: Spacing.md,
        //     marginBottom: Spacing.md,
        // },

        // // Logout spacing فقط
        // logoutWrapper: {
        //     marginHorizontal: Spacing.md,
        //     marginBottom: Spacing.lg,
        // },

        gridCard: {
            padding: 16,
            borderRadius: 16,
            width: '48%',
            marginBottom: 12,
            alignItems: 'flex-start',
        },

        gridCardIcon: {
            marginBottom: 10,
        },

        gridSection: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
        },

        listItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 14,
            marginBottom: 8,
            borderRadius: 10,
        },

        listItemLeft: {
            flexDirection: 'row',
            alignItems: 'center',
        },

        listItemTitle: {
            marginLeft: 12,
        },

        logoutButton: {
            marginHorizontal: 16,
            marginVertical: 16,
            padding: 14,
            borderRadius: 12,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },

        logoutText: {
            marginLeft: 8,
        },

        profileCard: {
            backgroundColor: '#000', // رح تنعكس ديناميكياً من theme
            padding: 16,
            margin: 16,
            borderRadius: 16,
        },

        editButton: {
            position: 'absolute',
            top: 10,
            left: 10,
        },

        profileName: {
            fontSize: 20,
            fontWeight: 'bold',
        },

        infoRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 6,
        },

        infoText: {
            marginLeft: 6,
        },

        promoBanner: {
            margin: 16,
            padding: 16,
            borderRadius: 16,
            borderWidth: 1,
        },

        promoTitle: {
            fontSize: 18,
        },

        promoSubtitle: {
            marginTop: 4,
        },

        promoLink: {
            marginTop: 6,
        },
    });