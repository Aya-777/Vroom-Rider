import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../index';

const STORAGE_KEY = 'language';

export class LanguageService {
  static async changeLanguage(
    language: string,
  ) {
    await i18n.changeLanguage(language);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      language,
    );
  }

  static async getSavedLanguage() {
    return AsyncStorage.getItem(
      STORAGE_KEY,
    );
  }
}