// src/components/CardSelectionView.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card as CardType, Spread } from '../types/tarot';
import { CardDeck } from './CardDeck';
import { ReadingBoard } from './ReadingBoard';
import { Sparkles } from 'lucide-react';

interface CardSelectionViewProps {
  spread: Spread;
  onComplete?: (cards: CardType[]) => void;
}

export function CardSelectionView({ spread, onComplete }: CardSelectionViewProps) {
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // src/components/CardSelectionView.tsx
const handleCardSelect = (card: CardType) => {
  if (selectedCards.length >= spread.positions.length) return;
  
  setIsTransitioning(true);
  // Prevent duplicate card selection
  if (!selectedCards.some(c => c.id === card.id)) {
    setSelectedCards(prev => [...prev, card]);
  }
  
  setTimeout(() => {
    setIsTransitioning(false);
  }, 500);
};

  useEffect(() => {
    if (selectedCards.length === spread.positions.length) {
      onComplete?.(selectedCards);
    }
  }, [selectedCards, spread.positions.length, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {selectedCards.length < spread.positions.length ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-serif text-white text-center mb-8">
                Select Your Cards
              </h2>
              <CardDeck
                onCardSelect={handleCardSelect}
                onHover={setHoveredCard}
                hoveredCard={hoveredCard}
                isTransitioning={isTransitioning}
                remainingSelections={spread.positions.length - selectedCards.length}
                selectedCards={selectedCards}
              />
              <div className="text-center">
                <p className="text-purple-200 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Select {spread.positions.length - selectedCards.length} more 
                  {spread.positions.length - selectedCards.length === 1 ? ' card' : ' cards'}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ReadingBoard spread={spread} selectedCards={selectedCards} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}