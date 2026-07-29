 export interface SavedPlace {
  id: number;
  label: string;
  address: string;
  latitude: number;
  longitude: number;
  icon: string
}

export interface SavedPlacesModalProps {
  visible: boolean;
  loading: boolean;

  places: SavedPlace[];

  onClose: () => void;
  onAddPress: () => void;
  onSelectPlace: (place: SavedPlace) => void;
}
export interface AddPlaceFormValues {
  name: string;
  address: string;
  icon: string;
}

