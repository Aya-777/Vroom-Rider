import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ActivityFooterActions({
    styles,
    onReview,
    onReride,
}: any) {
    const { t } = useTranslation(['activities']);
    return (
        <View style={styles.footer}>

            <TouchableOpacity
                style={styles.reviewButton}
                onPress={onReview}
            >
                <Text style={styles.reviewText}>{t('actions.leaveReview')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.rerideButton}
                onPress={onReride}
            >
                <Text style={styles.rerideText}>{t('actions.reride')}</Text>
            </TouchableOpacity>

        </View>
    );
}