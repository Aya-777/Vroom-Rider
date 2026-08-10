import { reverseGeocode } from '../../../core/services/location/GeoCodingService';
import { useRideStore } from '../store/useRideStore';
import { ActiveInput } from '../types/ride.types';

export function useRideMapLocation(
  activeInput: ActiveInput,
  setFromText: (value: string) => void,
  setToText: (value: string) => void,
  handleBottomSheet : (value: boolean) => void,
) {
  const {
    selectedMapLocation,
    setPickingLocation,
    setSelectedMapLocation,
  } = useRideStore();

  const setActiveInputText = (value: string) => {
    if (activeInput === 'pickup') {
      setFromText(value);
    } else if (activeInput === 'destination') {
      setToText(value);
    }
  };

  const onSetOnMap = () => {
    handleBottomSheet(false);
    setPickingLocation(true);
  };

  const onConfirmLocation = async () => {
    if (!selectedMapLocation) return;

    const { latitude, longitude } = selectedMapLocation;

    const address = await reverseGeocode(latitude, longitude);

    setActiveInputText(address);

    setPickingLocation(false);
    setSelectedMapLocation(null);
    handleBottomSheet(true);
  };

  return {
    onSetOnMap,
    onConfirmLocation,
  };
}