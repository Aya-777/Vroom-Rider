 export interface SavedPlace {
  id: number;
  label: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface SavedPlacesModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectPlace: (place: SavedPlace) => void;
  onAddPress: () => void;
}

export interface AddPlaceFormValues {
  name: string;
  address: string;
  icon: string;
}

