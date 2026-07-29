import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/editProfile.styles';
import LinearBg from '../../../shared/components/LinearBg';
import SubHeader from '../../../shared/components/SubHeader';
import Input from '../../../shared/components/Input';
import PhotoPickerSheet from '../../../shared/components/PhotoPickerSheet';
import { ProfileStackParamList } from '../../../navigation/main/profile/profileTypes';
import { useEditProfileViewModel } from '../viewmodels/useEditProfileViewModel';

import CameraIcon from '../../../assets/svg/common/camera.svg';
import UserIcon from '../../../assets/svg/profile/profile.svg';

export default function EditProfileScreen() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ProfileStackParamList, 'EditProfile'>>();

    const { colors } = useTheme();
    const styles = createStyles(colors);
    const { t } = useTranslation(['profile', 'common']);

    const vm = useEditProfileViewModel(route.params);

    return (
        <LinearBg
            colors={[colors.backgroundSoft, colors.background]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.container}
        >
            <SubHeader title={t('editProfile')} onBackPress={() => navigation.goBack()} />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.top}>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatarCircle}>
                            {vm.previewImageUri ? (
                                <Image source={{ uri: vm.previewImageUri }} style={styles.avatarImage} resizeMode="cover" />
                            ) : (
                                <UserIcon width={44} height={44} fill={colors.primary} />
                            )}
                        </View>

                        <TouchableOpacity style={styles.cameraBadge} activeOpacity={0.85} onPress={vm.openPhotoPicker}>
                            <CameraIcon width={16} height={16} fill={colors.backgroundSoft} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.middle}>
                    <Input
                        placeholder={t('firstName')}
                        value={vm.firstName}
                        onChangeText={vm.setFirstName}
                        containerStyle={styles.inputBox}
                        inputStyle={styles.input}
                    />

                    <Input
                        placeholder={t('lastName')}
                        value={vm.lastName}
                        onChangeText={vm.setLastName}
                        containerStyle={styles.inputBox}
                        inputStyle={styles.input}
                    />

                    {vm.error && <Text style={styles.error}>{vm.error}</Text>}
                </View>

                <View style={styles.bottom}>
                    <TouchableOpacity onPress={vm.handleSave} disabled={vm.isSaving}>
                        <LinearBg style={styles.button} colors={[colors.textPrimary, colors.surface]}>
                            {vm.isSaving ? (
                                <ActivityIndicator color={colors.backgroundSoft} />
                            ) : (
                                <Text style={styles.btnText}>{t('common:save')}</Text>
                            )}
                        </LinearBg>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <PhotoPickerSheet
                visible={vm.isPickerVisible}
                onClose={vm.closePhotoPicker}
                onPickCamera={vm.handlePickCamera}
                onPickGallery={vm.handlePickGallery}
            />
        </LinearBg>
    );
}