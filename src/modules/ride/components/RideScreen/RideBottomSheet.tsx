import { Dispatch, SetStateAction } from "react";
import { RideState } from "../../types/RideState";
import ExtraDetailsSheet from "../ExtraDetailsScreen/ExtraDetailsSheet";
import SelectRideSheet from "../SelectRideScreen/SelectRideSheet";

type Props = {
    rideState: RideState;
    setRideState: Dispatch<SetStateAction<RideState>>;
};

export default function RideBottomSheet({
  rideState,
  setRideState
}: Props) {
  const renderSheet = () => {
      switch (rideState) {
        case RideState.SELECT_RIDE:
            return <SelectRideSheet 
              onNextPress={() => setRideState(RideState.EXTRA_DETAILS)}
            />;
            
        case RideState.EXTRA_DETAILS:
            return <ExtraDetailsSheet />;
            
        case RideState.DRIVER_FOUND:
            // return <DriverFoundSheet />;
      
        case RideState.DRIVER_ARRIVED:
            // return <DriverArrivedSheet />;
      
        case RideState.RIDE_STARTED:
            // return <RideStartedSheet />;
      
        case RideState.RIDE_ENDED:
            // return <RideEndedSheet />;
      }
  }
  return (
    <>{renderSheet()}</>
  )
}