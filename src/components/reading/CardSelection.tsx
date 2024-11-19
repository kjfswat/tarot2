// src/components/reading/CardSelection.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card as CardType, Spread } from '../../types/tarot';
import { cards } from '../../data/cards';
import { CardBack } from '../CardBack';
import { Sparkles } from 'lucide-react';

interface CardSelectionProps {
  spread: Spread;
  onCardSelect: (card: CardType) => void;
  selectedCount: number;
}

export function CardSelection({ spread, onCardSelect, selectedCount }: CardSelectionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [shuffledCards, setShuffledCards] = useState<CardType[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    setIsShuffling(true);
    const newCards = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(newCards);
    setTimeout(() => setIsShuffling(false), 500);
  };

  const remainingSelections = spread.positions.length - selectedCount;

  return (
    <div className="space-y-8">
      <div className="relative min-h-[400px]">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {shuffledCards.slice(0, 15).map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="relative w-full aspect-[2/3] perspective-1000"
            >
              <motion.div
                className="w-full h-full preserve-3d cursor-pointer"
                initial={false}
                animate={{
                  rotateY: hoveredCard === index ? 180 : 0,
                  scale: isShuffling ? 0.95 : 1,
                }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => {
                  if (remainingSelections > 0) {
                    onCardSelect(card);
                    shuffleCards();
                  }
                }}
              >
                {/* Card Back */}
                <div className="absolute inset-0 w-full h-full backface-hidden">
                  <CardBack />
                </div>

                {/* Card Front */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                  <img 
                    src={card.image} 
                    alt={card.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg">
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-white text-sm font-serif">{card.name}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <p className="text-purple-200 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Select {remainingSelections} more {remainingSelections === 1 ? 'card' : 'cards'}
        </p>
      </div>
    </div>
  );
}