import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { profileRepository } from '../repositories/profileRepository';

export const useChangePhoneViewModel = () => {
    const navigation = useNavigation<any>();

    const [newPhone, setNewPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleNext = async () => {
        if (!newPhone || newPhone.length < 10 || !newPhone.startsWith('09')) {
            setError('phoneNumberStart'); 
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            await profileRepository.requestPhoneChange(newPhone);
            navigation.navigate('ChangePhoneOtp', { newPhone });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'CHANGE_PHONE_REQUEST_FAILED');
        } finally {
            setIsLoading(false);
        }
    };

    return { newPhone, setNewPhone, isLoading, error, handleNext };
};