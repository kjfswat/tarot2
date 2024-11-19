export interface CustomCard {
  id: string;
  name: string;
  image: string;
  description: string;
  meaningUpright: string;
  meaningReversed: string;
  isCustom: true;
  templateId?: string;
}

export interface CustomDeck {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  cards: CustomCard[];
  isActive: boolean;
  author: string;
  isPublic: boolean;
  templateId?: string;
}

export interface DeckTemplate {
  id: string;
  name: string;
  description: string;
  type: 'major' | 'minor' | 'full';
  cardTemplates: Array<{
    position: number;
    name: string;
    description: string;
    defaultImage: string;
  }>;
}