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
import { SharedValue } from 'react-native-reanimated';

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
  animatedPosition?: SharedValue<number>;
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
  animatedPosition,
}: Props) {
  const renderSheet = () => {
    switch (rideState) {
      case RideState.SELECT_RIDE:
        return <SelectRideSheet onNextPress={onSelectRideNext} 
        animatedPosition={animatedPosition}
        />;

      case RideState.EXTRA_DETAILS:
        return <ExtraDetailsSheet onNextPress={onExtraDetailsNext} 
        animatedPosition={animatedPosition}
        />;

      case RideState.CONFIRM_RIDE:
        return <RideConfirmationSheet onNextPress={onRideConfirmed} 
        animatedPosition={animatedPosition}
        />;

      case RideState.DRIVER_FOUND:
        return (
          <DriverFoundSheet
            onDriverFound={onDriverFound}
            onCancelPress={onCancelPress}
            onKeepRide={onKeepRide}
            isCancelling={isCancelling}
            setIsCancelling={setIsCancelling}
            animatedPosition={animatedPosition}
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
            animatedPosition={animatedPosition}
          />
        );

      case RideState.TRIP_STARTED:
        return <TripStartedSheet onTripEnded={onTripEnded} 
        animatedPosition={animatedPosition}
        />;
    }
  };
  return <>{renderSheet()}</>;
}
