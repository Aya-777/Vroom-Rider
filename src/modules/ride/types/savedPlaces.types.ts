export interface SavedPlace {
  id: string;
  title: string;
  address: string;
  icon: string; // Icon name (e.g., vector-icons)
}

export interface SavedPlacesModalProps {
  visible: boolean;
  onClose: () => void;
  // places: SavedPlace[];
  onSelectPlace: (place: SavedPlace) => void;
  // onAddPlace: () => void;
}