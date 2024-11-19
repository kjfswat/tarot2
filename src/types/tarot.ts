export type Card = {
  id: string;
  name: string;
  image: string;
  meaningUpright: string;
  meaningReversed: string;
  description: string;
  element?: string;
  zodiacSign?: string;
  numerology?: string;
};

export type Spread = {
  id: string;
  name: string;
  description: string;
  positions: SpreadPosition[];
};

export type SpreadPosition = {
  id: number;
  name: string;
  description: string;
};

export type Reading = {
  id: string;
  date: string;
  spreadType: string;
  readerId: string;
  cards: {
    position: string;
    card: Card;
    isReversed: boolean;
  }[];
  interpretation: string;
  combinations?: CardCombination[];
};

export type Reader = {
  id: string;
  name: string;
  title: string;
  avatar: string;
  description: string;
  style: 'nurturing' | 'analytical' | 'mystical' | 'direct';
  specialties: string[];
  experience: string;
};

export type CardCombination = {
  cards: Card[];
  significance: string;
  interpretation: string;
  advice: string;
};