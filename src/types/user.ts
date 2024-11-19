export type AstrologicalData = {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  zodiacSign: string;
  ascendant: string;
  moonSign: string;
  houses: Record<number, string>;
  planetaryPositions: Array<{
    planet: string;
    sign: string;
    house: number;
    degrees: number;
  }>;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  astrological?: AstrologicalData;
  preferences: {
    spiritualBeliefs: string[];
    lifeGoals: string[];
    areasOfInterest: string[];
    preferredReader?: string;
    preferredSpread?: string;
  };
  readingHistory: Array<{
    id: string;
    date: string;
    spreadType: string;
    readerId: string;
    insights: string[];
  }>;
};