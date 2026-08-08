import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { profileRepository } from '../repositories/profileRepository';
import { UpdateProfileImageInput } from '../types/profile.types';
import { updateCurrentUser } from '../../../core/store/userStore';
import { getFullImageUrl } from '../../../shared/utils/getImageUrl';

type EditProfileParams = {
    firstName?: string;
    lastName?: string;
    profileImage?: string | null;
} | undefined;

export const useEditProfileViewModel = (params: EditProfileParams) => {
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState(params?.firstName ?? '');
    const [lastName, setLastName] = useState(params?.lastName ?? '');
    const [pickedImage, setPickedImage] = useState<UpdateProfileImageInput | null>(null);
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const previewImageUri = pickedImage?.uri
        ?? getFullImageUrl(params?.profileImage)
        ?? null;

    const openPhotoPicker = () => setIsPickerVisible(true);
    const closePhotoPicker = () => setIsPickerVisible(false);

    const handlePickCamera = async () => {
        const result = await launchCamera({ mediaType: 'photo', quality: 0.8 });
        const asset = result.assets?.[0];
        if (!result.didCancel && asset?.uri) {
            setPickedImage({ uri: asset.uri, fileName: asset.fileName, type: asset.type });
        }
    };

    const handlePickGallery = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
        const asset = result.assets?.[0];
        if (!result.didCancel && asset?.uri) {
            setPickedImage({ uri: asset.uri, fileName: asset.fileName, type: asset.type });
        }
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            setError(null);

            const updated = await profileRepository.updateProfile({
                firstName,
                lastName,
                profileImage: pickedImage,
            });

            updateCurrentUser({
                first_name: updated.firstName,
                last_name: updated.lastName,
                profile_image: updated.profileImage,
                account_status: updated.accountStatus,
                rating: updated.ratingAvg,
            });

            navigation.goBack();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'UPDATE_PROFILE_FAILED');
        } finally {
            setIsSaving(false);
        }
    };

    return {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        previewImageUri,
        isPickerVisible,
        openPhotoPicker,
        closePhotoPicker,
        handlePickCamera,
        handlePickGallery,
        handleSave,
        isSaving,
        error,
    };
};