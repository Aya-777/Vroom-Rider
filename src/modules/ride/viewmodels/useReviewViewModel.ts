import { useEffect, useState } from 'react';
import { RideState} from '../types/RideState';
import { useRideStore } from '../store/useRideStore';
import { rideApi } from '../services/rideApi';
import { Alert } from 'react-native';


export function useReviewViewModel( isReviewVisible: boolean, setIsReviewVisible : (value: boolean)=> void ,rideId?: number ) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isComplaint, setIsComplaint] = useState(false);
  const {
    rideData,
    clearRide,
    currentRide,
    setCurrentRide,
    setRideState,
  } = useRideStore();


  const handleSubmitReview = async () => {

    console.log("ride  ", rideId);
    
    if(rideId){
      const ride = await rideApi.getTripById(rideId);
      if(ride.data.status !== 'COMPLETED'){
        Alert.alert('Ride uncompleted', 'The ride must be completed to leave a review on it');
        setReview('');
        setRating(0);
        setIsComplaint(false);
        setIsReviewVisible(false);
        return;
      }
    }
        
    setIsReviewVisible(false);
    
    console.log('submiting.....');
    try {
      await rideApi.submitReview(
        { rating: rating, comment: review, is_complaint: isComplaint },
        rideId ?? currentRide?.id ?? rideData.id ?? 0,
      );
    } catch {
      console.log('Error submitting review...');
    }
    
    setReview('');
    setRating(0);
    setIsComplaint(false);
    setCurrentRide(null);
    clearRide();
    setRideState(RideState.SELECT_RIDE);
    setIsReviewVisible(false);
  };
  
  const handleMaybeLater = () => {
    setReview('');
    setRating(0);
    setIsComplaint(false);
    setIsReviewVisible(false);
    setCurrentRide(null);
    clearRide();
    setRideState(RideState.SELECT_RIDE);
  };

  return{
    isComplaint,
    rating,
    review,

    setRating,
    setIsComplaint,
    setReview,

    handleMaybeLater,
    handleSubmitReview
  }
}