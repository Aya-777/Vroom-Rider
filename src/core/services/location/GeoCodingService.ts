export async function reverseGeocode(
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

    return data.display_name ?? '';
  } catch (error) {
    console.error(error);
    return '';
  }
}

export interface GeocodeResult {
  address: string;
  latitude: number;
  longitude: number;
}

export async function searchAddress(
  query: string,
): Promise<GeocodeResult[]> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(
        query,
      )}&limit=10`,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Vroom/1.0',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to search address');
    }

    const data = await response.json();

    return data.map((item: any) => ({
      address: item.display_name,
      latitude: Number(item.lat),
      longitude: Number(item.lon),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}