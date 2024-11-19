import { UserProfile } from '../types/user';
import { Card, Spread } from '../types/tarot';

export function generatePersonalizedInterpretation(
  spread: Spread,
  cards: Card[],
  userProfile?: UserProfile
): string {
  let interpretation = '';

  // Generate base interpretation
  cards.forEach((card, index) => {
    const position = spread.positions[index];
    interpretation += `\n\nIn the position of ${position.name}, ${card.name} suggests ${card.meaningUpright}. `;
    interpretation += `This ${position.description}. `;

    // Add personalized insights based on user profile
    if (userProfile?.preferences?.spiritualBeliefs) {
      const relevantBelief = userProfile.preferences.spiritualBeliefs.find(belief =>
        card.description.toLowerCase().includes(belief.toLowerCase())
      );
      if (relevantBelief) {
        interpretation += `This aligns with your spiritual connection to ${relevantBelief}. `;
      }
    }

    // Add insights based on life goals
    if (userProfile?.preferences?.lifeGoals) {
      const relevantGoal = userProfile.preferences.lifeGoals.find(goal =>
        card.description.toLowerCase().includes(goal.toLowerCase())
      );
      if (relevantGoal) {
        interpretation += `Consider how this relates to your goal of ${relevantGoal}. `;
      }
    }
  });

  // Add overall spread interpretation
  interpretation += `\n\nOverall, this ${spread.name} reading suggests `;
  interpretation += generateOverallTheme(cards);

  return interpretation.trim();
}

function generateOverallTheme(cards: Card[]): string {
  // Analyze card combinations and patterns
  const elements = cards.map(card => card.element).filter(Boolean);
  const hasMultipleElements = new Set(elements).size > 1;
  
  if (hasMultipleElements) {
    return "a time of dynamic change and multiple influences in your life. Consider how these different energies might work together to support your journey.";
  } else if (elements.length > 0) {
    return `a strong ${elements[0]} influence, suggesting a focus on ${getElementalMeaning(elements[0] as string)}.`;
  }

  return "a complex interplay of energies that invite deep reflection and conscious action.";
}

function getElementalMeaning(element: string): string {
  const meanings: Record<string, string> = {
    fire: "passion, creativity, and transformation",
    water: "emotions, intuition, and relationships",
    air: "thoughts, communication, and clarity",
    earth: "material concerns, stability, and practical matters",
    spirit: "spiritual growth and divine connection"
  };
  return meanings[element.toLowerCase()] || "personal growth and development";
}