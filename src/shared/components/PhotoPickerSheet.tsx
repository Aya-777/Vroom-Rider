import React from 'react';
import { Modal, View, TouchableOpacity, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../core/theme/useTheme';
import CameraIcon from '../../assets/svg/common/camera.svg';
import GalleryIcon from '../../assets/svg/common/gallery.svg';
import { createStyles } from '../styles/PhotoPickerSheet.styles'

interface PhotoPickerSheetProps {
    visible: boolean;
    onClose: () => void;
    onPickCamera: () => void;
    onPickGallery: () => void;
}

const PhotoPickerSheet = ({
    visible,
    onClose,
    onPickCamera,
    onPickGallery,
}: PhotoPickerSheetProps) => {
    const { colors } = useTheme();
    const styles = createStyles();

    const { t } = useTranslation(['auth']);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable
                    style={[styles.sheet, { backgroundColor: colors.backgroundSoft }]}
                    onPress={() => { }}
                >
                    <View style={[styles.handle, { backgroundColor: colors.textMuted }]} />

                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                            onClose();
                            onPickCamera();
                        }}
                    >
                        <CameraIcon width={22} height={22} fill={colors.primary} />
                        <Text style={[styles.optionText, { color: colors.textPrimary }]}>
                            {t('camera')}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                            onClose();
                            onPickGallery();
                        }}
                    >
                        <GalleryIcon width={22} height={22} fill={colors.primary} />
                        <Text style={[styles.optionText, { color: colors.textPrimary }]}>
                            {t('gallery')}
                        </Text>
                    </TouchableOpacity>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

export default PhotoPickerSheet;