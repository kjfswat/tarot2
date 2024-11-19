import React, { useState } from 'react';
import { Card as CardType, Spread } from '../types/tarot';
import { ReadingInterpretation } from './ReadingInterpretation';

interface ReadingBoardProps {
  spread: Spread;
  selectedCards: CardType[];
}

export function ReadingBoard({ spread, selectedCards }: ReadingBoardProps) {
  const [isComplete, setIsComplete] = useState(false);

  const formattedCards = selectedCards.map((card, index) => ({
    card,
    position: index,
    isReversed: Math.random() > 0.5,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900">
      <ReadingInterpretation
        spread={spread}
        selectedCards={formattedCards}
      />
    </div>
  );
}