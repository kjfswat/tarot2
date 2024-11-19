export const cards = [
  {
    id: 'fool',
    name: 'The Fool',
    image: 'https://www.sacred-texts.com/tarot/pkt/img/ar00.jpg',
    meaningUpright: 'New beginnings, innocence, spontaneity, free spirit',
    meaningReversed: 'Recklessness, risk-taking, inconsideration',
    description: 'The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner\'s luck, improvisation and believing in the universe.'
  },
  {
    id: 'magician',
    name: 'The Magician',
    image: 'https://www.sacred-texts.com/tarot/pkt/img/ar01.jpg',
    meaningUpright: 'Manifestation, resourcefulness, power, inspired action',
    meaningReversed: 'Manipulation, poor planning, untapped talents',
    description: 'The Magician represents manifestation, resourcefulness, power, and inspired action. You are ready to use the tools at your disposal to create something extraordinary.'
  },
  {
    id: 'high-priestess',
    name: 'The High Priestess',
    image: 'https://www.sacred-texts.com/tarot/pkt/img/ar02.jpg',
    meaningUpright: 'Intuition, sacred knowledge, divine feminine, the subconscious mind',
    meaningReversed: 'Secrets, disconnected from intuition, withdrawal and silence',
    description: 'The High Priestess represents intuition, mystery, spiritual awareness and inner voice.'
  },
  {
    id: 'empress',
    name: 'The Empress',
    image: 'https://www.sacred-texts.com/tarot/pkt/img/ar03.jpg',
    meaningUpright: 'Femininity, beauty, nature, nurturing, abundance',
    meaningReversed: 'Creative block, dependence on others, empty success',
    description: 'The Empress represents feminine power, nurturing, abundance, and connection with nature.'
  },
  {
    id: 'emperor',
    name: 'The Emperor',
    image: 'https://www.sacred-texts.com/tarot/pkt/img/ar04.jpg',
    meaningUpright: 'Authority, establishment, structure, a father figure',
    meaningReversed: 'Domination, excessive control, lack of discipline, inflexibility',
    description: 'The Emperor represents masculine energy, authority, structure and solid foundations.'
  }
  // Add more major arcana cards...
];

// You can also organize them by categories:
export const majorArcana = cards.filter(card => !card.suit);
export const suitOfWands = cards.filter(card => card.suit === 'wands');
export const suitOfCups = cards.filter(card => card.suit === 'cups');
export const suitOfSwords = cards.filter(card => card.suit === 'swords');
export const suitOfPentacles = cards.filter(card => card.suit === 'pentacles');

// Add helper function to get random card
export const getRandomCard = () => {
  return cards[Math.floor(Math.random() * cards.length)];
};

// Add helper function to get card by id
export const getCardById = (id: string) => {
  return cards.find(card => card.id === id);
};