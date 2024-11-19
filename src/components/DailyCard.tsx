import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card as CardType } from '../types/tarot';
import { Card } from './Card';
import { CardMeaning } from '../components/reading/CardMeaning';
import { Calendar, RefreshCw, Moon, Stars } from 'lucide-react';
import { cards } from '../data/cards';

export function DailyCard() {
  const [dailyCard, setDailyCard] = useState<CardType | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Custom card back design since image is missing
  const CardBackDesign = () => (
    <div className="w-full h-full rounded-lg bg-indigo-900 border-2 border-amber-500/20">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <Moon className="w-8 h-8 text-amber-400" />
        <div className="flex gap-2">
          <Stars className="w-6 h-6 text-amber-400/60" />
          <Stars className="w-6 h-6 text-amber-400/80" />
          <Stars className="w-6 h-6 text-amber-400" />
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    loadDailyCard();
  }, []);

  const loadDailyCard = async () => {
    try {
      setIsLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const storedDate = localStorage.getItem('dailyCardDate');
      const storedCard = localStorage.getItem('dailyCard');

      if (storedDate === today && storedCard) {
        const card = JSON.parse(storedCard);
        setDailyCard(card);
        setIsReversed(JSON.parse(localStorage.getItem('isReversed') || 'false'));
      } else {
        await generateDailyCard();
      }
    } catch (err) {
      setError('Failed to load daily card');
      console.error('Error loading daily card:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateDailyCard = async () => {
    try {
      setIsLoading(true);
      setIsRevealed(false);
      
      const today = new Date().toISOString().split('T')[0];
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      const reversed = Math.random() > 0.5;

      // Simulate loading for better UX
      await new Promise(resolve => setTimeout(resolve, 600));

      setDailyCard(randomCard);
      setIsReversed(reversed);

      localStorage.setItem('dailyCardDate', today);
      localStorage.setItem('dailyCard', JSON.stringify(randomCard));
      localStorage.setItem('isReversed', JSON.stringify(reversed));
    } catch (err) {
      setError('Failed to generate new card');
      console.error('Error generating daily card:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="bg-purple-900/40 backdrop-blur-sm rounded-xl p-6">
        <p className="text-red-400 text-center">{error}</p>
        <button
          onClick={loadDailyCard}
          className="mt-4 px-4 py-2 bg-purple-800 text-white rounded-lg mx-auto block"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-purple-900/40 backdrop-blur-sm rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-serif text-white">Card of the Day</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateDailyCard}
          disabled={isLoading}
          className="p-2 rounded-full hover:bg-purple-800/50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 text-amber-400 ${isLoading ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {dailyCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col md:flex-row gap-8"
          >
            <div className="flex-shrink-0">
            <Card
  card={dailyCard}
  isRevealed={isRevealed}
  isReversed={isReversed}
  onReveal={() => setIsRevealed(true)}
/>
            </div>
            <AnimatePresence>
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-grow"
                >
                  <h3 className="text-lg font-serif text-white mb-2">
                    {dailyCard.name} {isReversed ? '(Reversed)' : ''}
                  </h3>
                  <CardMeaning card={dailyCard} isReversed={isReversed} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}