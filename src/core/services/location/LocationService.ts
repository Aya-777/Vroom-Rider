import Geolocation from 'react-native-geolocation-service';

export type Location = {
  latitude: number;
  longitude: number;
  address: string;
};

class LocationService {
  private async reverseGeocode(
    latitude: number,
    longitude: number,
  ): Promise<string> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            Accept: 'application/json',
            'User-Agent': 'Vroom/1.0',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to reverse geocode');
      }

      const data = await response.json();

      const address = data.address;

      return [
        address?.road,
        address?.suburb,
        address?.city || address?.town || address?.village,
      ]
        .filter(Boolean)
        .join(', ');
    } catch (error) {
      console.error('Reverse geocoding failed:', error);

      return '';
    }
  }

  async getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        async position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const address = await this.reverseGeocode(latitude,longitude);

          resolve({
            latitude,
            longitude,
            address,
          });
        },
        error => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    });
  }

  watchLocation(
    onLocationChanged: (location: Location) => void,
    onError?: (error: any) => void,
  ) {
    return Geolocation.watchPosition(
      async position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const address = await this.reverseGeocode(latitude,longitude);

        onLocationChanged({
          latitude,
          longitude,
          address,
        });
      },
      error => {
        onError?.(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 2000,
        fastestInterval: 2000,
      },
    );
  }

  stopWatching(watchId: number) {
    Geolocation.clearWatch(watchId);
  }
}

export default new LocationService();