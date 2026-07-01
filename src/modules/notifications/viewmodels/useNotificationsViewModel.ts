import { notificationsData } from '../constants/notificationsData';
import { useNavigation } from '@react-navigation/native';

export function useNotificationsViewModel() {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    }
    return {
        notifications: notificationsData,
        isLoading: false,
        handleBackPress
    };
}