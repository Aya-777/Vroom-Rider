import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ActivityFooterActions({
    styles,
    onReview,
    onReride,
    onCancel,
    isScheduled,
}: any) {
    const { t } = useTranslation(['activities', 'common']);
    return (
      <View style={styles.actionsContainer}>
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
        {isScheduled && 
          <TouchableOpacity style={styles.confirmButton} onPress={onCancel}>
            <Text style={styles.confirmButtonText} numberOfLines={1}>{t('common:cancel')}</Text>
          </TouchableOpacity>
        }
      </View>
    );
}