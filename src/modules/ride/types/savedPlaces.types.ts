import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes'; 

export interface SavedPlace {
  id: string;
  title: string;
  address: string;
  icon: string;
}

export interface SavedPlacesModalProps {
  visible: boolean;
  onClose: () => void;
  // places: SavedPlace[];
  onSelectPlace: (place: SavedPlace) => void;
  // onAddPlace: () => void;
}

export interface AddPlaceFormValues {
  name: string;
  address: string;
  icon: string;
}

