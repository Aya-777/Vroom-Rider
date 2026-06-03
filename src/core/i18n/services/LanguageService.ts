import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../index';
import { SupportedLanguage } from '../types';
import { STORAGE_KEY } from '../constants';
import { DEFAULT_LANGUAGE } from '../constants';


export class LanguageService {
  static async changeLanguage(
    language: SupportedLanguage,
  ) {
    await i18n.changeLanguage(language);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      language,
    );
  }

  static async getSavedLanguage(): Promise<SupportedLanguage | null> {
    const language = await AsyncStorage.getItem(
      STORAGE_KEY,
    );
    return language as SupportedLanguage | null;
  }

  static getCurrentLanguage() {
    return i18n.language;
  }

  static async initializeLanguage() {
    try {
      const savedLanguage =
        await this.getSavedLanguage();

      const language =
        savedLanguage ?? DEFAULT_LANGUAGE;

      await i18n.changeLanguage(
        language,
      );
    } catch (error) {
      console.log(
        'Failed to load language:',
        error,
      );

      await i18n.changeLanguage(
        DEFAULT_LANGUAGE,
      );
    }
  }
}