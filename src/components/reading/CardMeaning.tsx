import React from 'react';
import { Card as CardType } from '../types/tarot';
import { BookOpen, Compass, Star } from 'lucide-react';

interface CardMeaningProps {
  card: CardType;
  isReversed: boolean;
}

export function CardMeaning({ card, isReversed }: CardMeaningProps) {
  return (
    <div className="mt-4 pt-4 border-t border-purple-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-purple-800/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-semibold text-white">Keywords</h4>
          </div>
          <p className="text-sm text-purple-200">
            {isReversed ? card.meaningReversed : card.meaningUpright}
          </p>
        </div>
        <div className="p-4 bg-purple-800/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-semibold text-white">Element & Zodiac</h4>
          </div>
          <p className="text-sm text-purple-200">
            Associated with spiritual growth and inner wisdom
          </p>
        </div>
        <div className="p-4 bg-purple-800/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-semibold text-white">Numerology</h4>
          </div>
          <p className="text-sm text-purple-200">
            Represents spiritual awakening and divine guidance
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-purple-200">{card.description}</p>
    </div>
  );
}