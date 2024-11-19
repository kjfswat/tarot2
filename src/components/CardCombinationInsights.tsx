import React from 'react';
import { CardCombination } from '../types/tarot';
import { Sparkles, AlertCircle, Lightbulb } from 'lucide-react';

interface CardCombinationInsightsProps {
  combinations: CardCombination[];
}

export function CardCombinationInsights({ combinations }: CardCombinationInsightsProps) {
  if (combinations.length === 0) return null;

  return (
    <div className="bg-purple-900/40 backdrop-blur-sm rounded-xl p-6 mt-6">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-amber-400" />
        <h3 className="text-xl font-serif text-white">Card Combinations</h3>
      </div>

      <div className="space-y-6">
        {combinations.map((combination, index) => (
          <div
            key={index}
            className="bg-purple-800/30 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center gap-2 text-amber-400">
              <AlertCircle className="w-4 h-4" />
              <h4 className="font-serif">{combination.significance}</h4>
            </div>

            <div className="flex gap-4 mb-4">
              {combination.cards.map((card, cardIndex) => (
                <div
                  key={cardIndex}
                  className="text-sm text-purple-200"
                >
                  {card.name}
                </div>
              ))}
            </div>

            <p className="text-purple-200 text-sm">
              {combination.interpretation}
            </p>

            <div className="flex items-start gap-2 mt-3 pt-3 border-t border-purple-700">
              <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5" />
              <p className="text-sm text-amber-300">
                {combination.advice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}