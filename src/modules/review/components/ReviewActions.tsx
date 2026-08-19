import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/review.styles';
import { useTranslation } from 'react-i18next';

type Props = {
    onCancel: () => void;
    onSubmit: () => void;
};

export default function ReviewActions({
    onCancel,
    onSubmit,
}: Props) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const { t } = useTranslation(['modals', 'common']); 

    return (
        <View style={styles.actionsContainer}>

            <TouchableOpacity
                style={styles.cancelButton}
                onPress={onCancel}
            >
                <Text style={styles.cancelText}>
                    {t('modals:review.maybeLater')}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.submitButton}
                onPress={onSubmit}
            >
                <Text style={styles.submitText}>
                    {t('common:submit')}
                </Text>
            </TouchableOpacity>
        </View>
    );
}