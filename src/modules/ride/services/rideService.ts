import {apiClient} from '../../../core/network/apiClient';
// change the path depending on where your axios instance is

class RideService {

  async cancelRide(rideId: string) {
    const response = await apiClient.post(
      `/api/v1/rides/${rideId}/cancel/`
    );

    return response.data;
  }

  async getSavedPlaces() {
    const response = await apiClient.get(
        '/trips/saved-locations/'
    );

    return response.data;
}

}

export default new RideService();