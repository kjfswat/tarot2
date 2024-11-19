import React from 'react';
import { Card as CardType, Spread } from '../types/tarot';
import { Card } from '../Card';
interface SpreadMapProps {
  spread: Spread;
  selectedCards: Array<{ card: CardType; position: number; isReversed: boolean }>;
}

export function SpreadMap({ spread, selectedCards }: SpreadMapProps) {
  const getPositionStyle = (position: number) => {
    switch (spread.id) {
      case 'three-card':
        return {
          gridColumn: `span 1`,
          transform: `translateX(${(position - 1) * 120}%)`
        };
      case 'horseshoe':
        const angle = (position - 1) * 30 - 90;
        const radius = 150;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;
        return {
          transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
          transformOrigin: 'center'
        };
      case 'relationship':
        const positions = {
          1: { top: '50%', left: '20%' },
          2: { top: '50%', right: '20%' },
          3: { top: '20%', left: '50%' },
          4: { bottom: '20%', left: '50%' },
          5: { top: '50%', left: '50%' },
          6: { bottom: '50%', left: '50%' }
        };
        return positions[position as keyof typeof positions];
      case 'career':
        const careerPositions = {
          1: { top: '50%', left: '50%' },
          2: { top: '20%', left: '50%' },
          3: { top: '50%', left: '20%' },
          4: { top: '50%', right: '20%' },
          5: { bottom: '20%', left: '35%' },
          6: { bottom: '20%', right: '35%' }
        };
        return careerPositions[position as keyof typeof careerPositions];
      default:
        return {};
    }
  };

  return (
    <div className="relative aspect-square max-w-2xl mx-auto">
      <div className="absolute inset-0 bg-purple-900/20 backdrop-blur-sm rounded-xl" />
      <div className="relative w-full h-full p-8">
        {selectedCards.map(({ card, position, isReversed }) => (
          <div
            key={`${card.id}-${position}`}
            className="absolute transition-all duration-500"
            style={getPositionStyle(position)}
          >
            <Card
              card={card}
              isRevealed={true}
              position={position}
            />
            <div className="mt-2 text-center">
              // In SpreadMap.tsx
            <span className="text-xs text-purple-200">
              {spread?.positions?.[position - 1]?.name || `Position ${position}`}
            </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}