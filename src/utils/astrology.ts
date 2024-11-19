import { AstrologicalData } from '../types/user';

const API_KEY = process.env.ASTROLOGY_API_KEY;
const API_BASE_URL = 'https://api.astrologyapi.com/v1';

export async function calculateAstrologicalChart(
  birthDate: string,
  birthTime: string,
  birthPlace: string
): Promise<AstrologicalData> {
  try {
    const response = await fetch(`${API_BASE_URL}/birth-chart`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: birthDate,
        time: birthTime,
        place: birthPlace,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch astrological data');
    }

    const data = await response.json();
    
    // Transform API response into our AstrologicalData format
    return {
      birthDate,
      birthTime,
      birthPlace,
      zodiacSign: data.sun_sign,
      ascendant: data.ascendant,
      moonSign: data.moon_sign,
      houses: data.houses.reduce((acc: Record<number, string>, house: any) => {
        acc[house.number] = house.sign;
        return acc;
      }, {}),
      planetaryPositions: data.planets.map((planet: any) => ({
        planet: planet.name,
        sign: planet.sign,
        house: planet.house,
        degrees: planet.degrees
      }))
    };
  } catch (error) {
    console.error('Error calculating astrological chart:', error);
    throw error;
  }
}