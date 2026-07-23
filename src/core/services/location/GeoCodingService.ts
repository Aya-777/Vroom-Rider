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