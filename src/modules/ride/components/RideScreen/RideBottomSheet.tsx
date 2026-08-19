import { SharedValue } from 'react-native-reanimated';
import ReviewModal from '../../../review/components/ReviewModal';
import { useRideStore } from '../../store/useRideStore';
import { RideState } from '../../types/RideState';
import DriverArrivedSheet from '../DriverArrivedScreen/DriverArrivedSheet';
import DriverFoundSheet from '../DriverFoundScreen/DriverFoundSheet';
import ExtraDetailsSheet from '../ExtraDetailsScreen/ExtraDetailsSheet';
import RideConfirmationSheet from '../RideConfirmationScreen/RideConfirmationSheet';
import SearchingForaDriverSheet from '../SearchingForaDriver/SearchingForaDriverSheet';
import { NoDriverFoundModal } from '../NoDriverFound/NoDriverFoundModal';
import SelectRideSheet from '../SelectRideScreen/SelectRideSheet';
import TripEndedModal from '../TripEndedModal/TripEndedModal';
import TripStartedSheet from '../TripStartedScreen/TripStartedSheet';
import { RideFilter } from '../../types/ride.types';
import {ScheduleBottomSheet} from '../Schedule/ScheduleBottomSheet';

type Props = {
  rideState: RideState;
  isCancelling: boolean;
  setIsCancelling: (value: boolean) => void;
  onSelectRideNext: () => void;
  onExtraDetailsNext: () => void;
  onRideConfirmed: () => void;
  onCancelPress: (reason: string) => void;
  onKeepRide: () => void;
  rematch: () => void;
  animatedPosition?: SharedValue<number>;
  isBillVisible: boolean;
  isReviewVisible: boolean;
  setIsBillVisible: (value: boolean) => void;
  setIsReviewVisible: (value: boolean) => void;
  filters: RideFilter[];
  handleSubmit: (rating: number, comment: string, isComplaint: boolean) => void;
  handleMaybeLater: () => void;
  handleSetupRidePress: (date: Date) => void;
};

export default function RideBottomSheet({
  rideState,
  isCancelling,
  setIsCancelling,
  onSelectRideNext,
  onExtraDetailsNext,
  onRideConfirmed,
  onCancelPress,
  onKeepRide,
  rematch,
  animatedPosition,
  isBillVisible,
  isReviewVisible,
  setIsBillVisible,
  setIsReviewVisible,
  filters,
  handleSubmit,
  handleMaybeLater,
  handleSetupRidePress
}: Props) {
  const { currentRide, setRideState } = useRideStore();

  const renderSheet = () => {

    switch (rideState) {

      case RideState.SELECT_TIME:
        return(
          <ScheduleBottomSheet 
            onSetupOrder={handleSetupRidePress}
            onClose={() => setRideState(RideState.SELECT_RIDE)}
            animatedPosition={animatedPosition}
          />
        );

      case RideState.SELECT_RIDE:
        return (
          <SelectRideSheet
            onNextPress={onSelectRideNext}
            animatedPosition={animatedPosition}
          />
        );

      case RideState.EXTRA_DETAILS:
        return (
          <ExtraDetailsSheet
            onNextPress={onExtraDetailsNext}
            animatedPosition={animatedPosition}
          />
        );

      case RideState.CONFIRM_RIDE:
        return (
          <RideConfirmationSheet
            onNextPress={onRideConfirmed}
            animatedPosition={animatedPosition}
          />
        );

      case RideState.SEARCHING_FOR_DRIVER:
        return (
          <SearchingForaDriverSheet
            onCancelPress={onCancelPress}
            isCancelling={isCancelling}
            setIsCancelling={setIsCancelling}
            onKeepRide={onKeepRide}
            animatedPosition={animatedPosition}
          />
        );

      case RideState.NO_DRIVER_FOUND:
        return (
          <NoDriverFoundModal 
            cancelPress={() => onCancelPress('NoDriverFound')}
            rematch={rematch}
            isFailed={true}
          />
        );

      case RideState.DRIVER_FOUND:
        return (
          <DriverFoundSheet
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
            onCancelPress={onCancelPress}
            onKeepRide={onKeepRide}
            isCancelling={isCancelling}
            setIsCancelling={setIsCancelling}
            animatedPosition={animatedPosition}
          />
        );

      case RideState.TRIP_STARTED:
        return <TripStartedSheet animatedPosition={animatedPosition} />;

      case RideState.TRIP_ENDED:
        return (
          <TripEndedModal
            visible={isBillVisible}
            onConfirmPayment={() => {
              setIsReviewVisible(true);
              setIsBillVisible(false);
            }}
            currentRide={currentRide}
            filters={filters}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {renderSheet()}

      <ReviewModal
        visible={isReviewVisible}
        onClose={() => {
          handleMaybeLater();
        }}
        onSubmit={handleSubmit}
      />
    </>
  );
}
