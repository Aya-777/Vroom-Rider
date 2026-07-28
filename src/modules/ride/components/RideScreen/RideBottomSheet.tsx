import { Dispatch, SetStateAction } from 'react';
import { RideState } from '../../types/RideState';
import ExtraDetailsSheet from '../ExtraDetailsScreen/ExtraDetailsSheet';
import SelectRideSheet from '../SelectRideScreen/SelectRideSheet';
import RideConfirmationSheet from '../RideConfirmationScreen/RideConfirmationSheet';
import DriverFoundSheet from '../DriverFoundScreen/DriverFoundSheet';
import DriverArrivedSheet from '../DriverArrivedScreen/DriverArrivedSheet';
import TripStartedSheet from '../TripStartedScreen/TripStartedSheet';
import { Location } from '../../../../core/services/location/LocationService';

type Props = {
  rideState: RideState;
  currentLocation: Location;
  estimate: {
    price?: string;
    time?: string;
    distance?: number;
  };
  onSelectRideNext: () => void;
  onExtraDetailsNext: () => void;
  onRideConfirmed: () => void;
  onDriverFound: () => void;
  onTripStarted: () => void;
  onTripEnded: () => void;
  onCancelPress: () => void
};

export default function RideBottomSheet({
  rideState,
  onSelectRideNext,
  onExtraDetailsNext,
  onRideConfirmed,
  onDriverFound,
  onTripStarted,
  onTripEnded,
  currentLocation,
  estimate,
  onCancelPress
}: Props) {
  const renderSheet = () => {
    switch (rideState) {
      case RideState.SELECT_RIDE:
        return (
          <SelectRideSheet
            onNextPress={onSelectRideNext}
            currentLocation={currentLocation}
          />
        );

      case RideState.EXTRA_DETAILS:
        return <ExtraDetailsSheet onNextPress={onExtraDetailsNext} estimate={estimate}/>;

      case RideState.CONFIRM_RIDE:
        return <RideConfirmationSheet onNextPress={onRideConfirmed} />;

      case RideState.DRIVER_FOUND:
        return <DriverFoundSheet onDriverFound={onDriverFound} onCancelPress={onCancelPress} />;

      case RideState.DRIVER_ARRIVED:
        return <DriverArrivedSheet onTripStarted={onTripStarted} onCancelPress={onCancelPress}/>;

      case RideState.TRIP_STARTED:
        return <TripStartedSheet onTripEnded={onTripEnded} />;
    }
  };
  return <>{renderSheet()}</>;
}
