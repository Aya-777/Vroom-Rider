import {selectContactPhone} from 'react-native-select-contact';

export interface SelectedContact {
  name: string;
  phone: string;
}

class ContactService {
  async pickContact(): Promise<SelectedContact | null> {
    try {
      const selection = await selectContactPhone();

      if (!selection) {
        return null;
      }

      return {
        name: selection.contact.name,
        phone: selection.selectedPhone.number,
      };
    } catch (error) {
      console.error('Failed to pick contact', error);
      return null;
    }
  }
}

export default new ContactService();