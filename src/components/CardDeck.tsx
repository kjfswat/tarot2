import React from 'react';
import { motion } from 'framer-motion';
import { Card as CardType } from '../types/tarot';
import { cards } from '../data/cards';
import { CardBack } from './CardBack';

interface CardDeckProps {
  onCardSelect: (card: CardType) => void;
  onHover: (index: number | null) => void;
  hoveredCard: number | null;
  isTransitioning: boolean;
  remainingSelections: number;
  selectedCards: CardType[];
}

export function CardDeck({
  onCardSelect,
  onHover,
  hoveredCard,
  isTransitioning,
  remainingSelections,
  selectedCards
}: CardDeckProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-4 perspective-1000">
      {cards.map((card, index) => (
        <motion.div
          key={`${card.id}-${index}`}
          className="relative preserve-3d cursor-pointer"
          whileHover={{ scale: 1.05 }}
          animate={{
            rotateY: hoveredCard === index ? 180 : 0,
            scale: isTransitioning ? 0.95 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          onHoverStart={() => onHover(index)}
          onHoverEnd={() => onHover(null)}
          onClick={() => {
            if (remainingSelections > 0 && !selectedCards.includes(card)) {
              onCardSelect(card);
            }
          }}
        >
          {/* Card Back - Shows first */}
          <div 
            className="absolute inset-0 w-full h-full backface-hidden"
            style={{ transform: 'rotateY(0deg)' }}
          >
            <CardBack />
          </div>

          {/* Card Front - Shows when flipped */}
          <div 
            className="absolute inset-0 w-full h-full backface-hidden"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="relative w-full h-full bg-purple-900 rounded-xl overflow-hidden">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = '/fallback-card.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="text-sm font-serif font-semibold">{card.name}</h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}