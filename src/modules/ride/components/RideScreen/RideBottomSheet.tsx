import { Dispatch, SetStateAction } from 'react';
import { RideState } from '../../types/RideState';
import ExtraDetailsSheet from '../ExtraDetailsScreen/ExtraDetailsSheet';
import SelectRideSheet from '../SelectRideScreen/SelectRideSheet';
import RideConfirmationSheet from '../RideConfirmationScreen/RideConfirmationSheet';
import DriverFoundSheet from '../DriverFoundScreen/DriverFoundSheet';
import DriverArrivedSheet from '../DriverArrivedScreen/DriverArrivedSheet';
import TripStartedSheet from '../TripStartedScreen/TripStartedSheet';
import { Location } from '../../../../core/services/location/LocationService';
import { EstimateInitialResponseDTO } from '../../services/dto/estimate.dto';

type Props = {
  rideState: RideState;
  isCancelling: boolean;
  setIsCancelling: (value: boolean) => void;
  onSelectRideNext: () => void;
  onExtraDetailsNext: () => void;
  onRideConfirmed: () => void;
  onDriverFound: () => void;
  onTripStarted: () => void;
  onTripEnded: () => void;
  onCancelPress: (reason: string) => void;
  onKeepRide: () => void;
};

export default function RideBottomSheet({
  rideState,
  isCancelling,
  setIsCancelling,
  onSelectRideNext,
  onExtraDetailsNext,
  onRideConfirmed,
  onDriverFound,
  onTripStarted,
  onTripEnded,
  onCancelPress,
  onKeepRide,
}: Props) {
  const renderSheet = () => {
    switch (rideState) {
      case RideState.SELECT_RIDE:
        return <SelectRideSheet onNextPress={onSelectRideNext} />;

      case RideState.EXTRA_DETAILS:
        return <ExtraDetailsSheet onNextPress={onExtraDetailsNext} />;

      case RideState.CONFIRM_RIDE:
        return <RideConfirmationSheet onNextPress={onRideConfirmed} />;

      case RideState.DRIVER_FOUND:
        return (
          <DriverFoundSheet
            onDriverFound={onDriverFound}
            onCancelPress={onCancelPress}
            onKeepRide={onKeepRide}
            isCancelling={isCancelling}
            setIsCancelling={setIsCancelling}
          />
        );

      case RideState.DRIVER_ARRIVED:
        return (
          <DriverArrivedSheet
            onTripStarted={onTripStarted}
            onCancelPress={onCancelPress}
            onKeepRide={onKeepRide}
            isCancelling={isCancelling}
            setIsCancelling={setIsCancelling}
          />
        );

      case RideState.TRIP_STARTED:
        return <TripStartedSheet onTripEnded={onTripEnded} />;
    }
  };
  return <>{renderSheet()}</>;
}
