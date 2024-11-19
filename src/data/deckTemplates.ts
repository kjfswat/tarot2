import { DeckTemplate } from '../types/deck';

export const deckTemplates: DeckTemplate[] = [
  {
    id: 'major-arcana',
    name: 'Major Arcana Template',
    description: 'Traditional 22 Major Arcana cards',
    type: 'major',
    cardTemplates: [
      {
        position: 0,
        name: 'The Fool',
        description: 'New beginnings, innocence, spontaneity',
        defaultImage: 'https://images.unsplash.com/photo-1635407640793-72dd329d218a?w=800&q=80'
      },
      {
        position: 1,
        name: 'The Magician',
        description: 'Manifestation, resourcefulness, power',
        defaultImage: 'https://images.unsplash.com/photo-1633456091837-96dcd2109016?w=800&q=80'
      }
      // Add more card templates...
    ]
  },
  {
    id: 'minimal-deck',
    name: 'Minimal Deck Template',
    description: 'A simplified deck with essential cards',
    type: 'full',
    cardTemplates: [
      {
        position: 0,
        name: 'Light',
        description: 'Illumination and clarity',
        defaultImage: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&q=80'
      },
      {
        position: 1,
        name: 'Shadow',
        description: 'Hidden aspects and mystery',
        defaultImage: 'https://images.unsplash.com/photo-1518818608552-195ed130cdf4?w=800&q=80'
      }
      // Add more card templates...
    ]
  }
];