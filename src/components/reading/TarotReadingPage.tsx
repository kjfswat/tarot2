import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { spreads } from '../../data/spreads';
import { Spread, Card as CardType } from '../../types/tarot';
import { CardSelection } from './CardSelection';
import { ReadingInterpretation } from './ReadingInterpretation';
import { Sparkles, ArrowLeft } from 'lucide-react';

export function TarotReadingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'selection' | 'interpretation'>('selection');
  const [selectedSpread, setSelectedSpread] = useState<Spread | null>(null);
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const spreadId = location.state?.spreadId || sessionStorage.getItem('selectedSpread');
    if (!spreadId) {
      navigate('/');
      return;
    }

    const spread = spreads.find(s => s.id === spreadId);
    if (spread) {
      setSelectedSpread(spread);
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

 const handleCardSelect = (card: CardType) => {
  if (selectedCards.length >= (selectedSpread?.positions?.length || 0)) return;
  
  setSelectedCards(prev => {
    // Prevent duplicate cards
    if (prev.some(c => c.id === card.id)) return prev;
    return [...prev, card];
  });
};

  useEffect(() => {
    if (selectedSpread && selectedCards.length === selectedSpread.positions.length) {
      setIsLoading(true);
      // Simulate loading time for dramatic effect
      setTimeout(() => {
        setCurrentStep('interpretation');
        setIsLoading(false);
      }, 1500);
    }
  }, [selectedCards, selectedSpread]);

  if (!selectedSpread) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Spread Selection
        </button>

        <AnimatePresence mode="wait">
          {currentStep === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl font-serif text-white mb-4 flex items-center justify-center gap-3">
                  <Sparkles className="w-8 h-8 text-amber-400" />
                  {selectedSpread.name}
                </h1>
                <p className="text-purple-200">
                  Select {selectedSpread.positions.length - selectedCards.length} more cards
                </p>
              </div>

              <CardSelection
                spread={selectedSpread}
                onCardSelect={handleCardSelect}
                selectedCount={selectedCards.length}
              />

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
                >
                  <div className="text-center text-white">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-lg">Revealing your reading...</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {currentStep === 'interpretation' && (
            <motion.div
              key="interpretation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ReadingInterpretation
                spread={selectedSpread}
                selectedCards={selectedCards.map((card, index) => ({
                  card,
                  position: index,
                  isReversed: Math.random() > 0.5
                }))}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}