import { useEffect } from "react";
import { useRideRepository } from "../repositories/rideRepositories";
import { useRideStore } from "../store/useRideStore";
import { SavedPlace } from "../types/savedPlaces.types";

export function useSavedPlaces(
  isModalVisible: boolean,
  setIsModalVisible: (value: boolean) => void,
  activeInput?: 'pickup' | 'destination' | null,
  setFromText?: (value: string) => void,
  setToText?: (value: string) => void,
  setPickupCoordinates?: (coords: { latitude: number; longitude: number }) => void,
  setDestinationCoordinates?: (coords: { latitude: number; longitude: number }) => void,
) {
  const {
    savedPlaces,
    setSavedPlaces,
  } = useRideStore();

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useRideRepository.useSavedPlaces(isModalVisible);

  const { mutate: deleteSavedPlace } =
    useRideRepository.useDeleteSavedPlace();

  useEffect(() => {
    if (data) {
      setSavedPlaces(data);
    }
  }, [data, setSavedPlaces]);

  const onDeleteSavedPlace = (id: number) => {
    deleteSavedPlace(id, {
      onError: error => {
        console.error('Failed to delete saved place', error);
      },
    });
  };

  const onSelectPlace = (place: SavedPlace) => {
    if (activeInput === 'pickup') {
      setFromText?.(place.address);
      setPickupCoordinates?.({ latitude: place.latitude, longitude: place.longitude });
    } else if (activeInput === 'destination') {
      setToText?.(place.address);
      setDestinationCoordinates?.({ latitude: place.latitude, longitude: place.longitude });
    }
    setIsModalVisible(false);
  };

  return {
    savedPlaces,
    savedPlacesLoading: isLoading,
    savedPlacesError: error,
    fetchSavedPlaces: refetch,
    onDeleteSavedPlace,
    onSelectPlace,
  };
}