import { Card, Spread } from '../types/tarot';
import { AstrologicalData, UserProfile } from '../types/user';

export function generateCardInterpretation(
  card: Card,
  position: number,
  isReversed: boolean,
  spread: Spread,
  astrologicalData?: AstrologicalData,
  userProfile?: UserProfile
): string {
  const positionContext = spread.positions[position].description;
  const meaning = isReversed ? card.meaningReversed : card.meaningUpright;
  let interpretation = `In the position of ${spread.positions[position].name}, ${card.name} suggests ${meaning}. ${positionContext}`;

  // Add personalized insights based on user profile
  if (userProfile?.preferences?.spiritualBeliefs) {
    const relevantBelief = userProfile.preferences.spiritualBeliefs.find(belief => 
      card.description.toLowerCase().includes(belief.toLowerCase())
    );
    if (relevantBelief) {
      interpretation += ` This aligns with your spiritual connection to ${relevantBelief}.`;
    }
  }

  // Add astrological insights
  if (astrologicalData && card.zodiacSign) {
    if (card.zodiacSign === astrologicalData.zodiacSign) {
      interpretation += ` The ${card.zodiacSign} energy of this card strongly resonates with your sun sign.`;
    }
    const relevantPlanet = astrologicalData.planetaryPositions.find(p => 
      p.sign === card.zodiacSign
    );
    if (relevantPlanet) {
      interpretation += ` ${relevantPlanet.planet} in ${relevantPlanet.sign} amplifies this card's message.`;
    }
  }

  return interpretation;
}