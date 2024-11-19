import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { spreads } from '../data/spreads';
import { Layout, Clock, Compass, Star } from 'lucide-react';
import { SpreadCard } from './SpreadCard';

export function SpreadSelection() {
  const [selectedSpread, setSelectedSpread] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const spreadIcons = {
    'three-card': Clock,
    'celtic-cross': Compass,
    'horseshoe': Layout,
  };

  const handleBeginReading = async () => {
  if (!selectedSpread) return;
  setIsLoading(true);
  try {
    // Clear any previous spread selection
    sessionStorage.removeItem('selectedSpread');
    // Store new selection
    sessionStorage.setItem('selectedSpread', selectedSpread);
    navigate('/reading', { 
      state: { 
        spreadId: selectedSpread,
        isNewReading: true // Add this flag
      } 
    });
  } catch (error) {
    console.error('Error starting reading:', error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-indigo-900 to-purple-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">
            Choose Your Spread
          </h2>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            Select a spread that resonates with your question. Each layout offers unique insights into different aspects of your journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spreads.map((spread) => (
            <SpreadCard
              key={spread.id}
              spread={spread}
              isSelected={selectedSpread === spread.id}
              onSelect={() => setSelectedSpread(spread.id)}
              Icon={spreadIcons[spread.id as keyof typeof spreadIcons] || Star}
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedSpread && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-12 text-center"
            >
              <button
                onClick={handleBeginReading}
                disabled={isLoading}
                className={`
                  px-8 py-3 bg-amber-500 text-black font-bold rounded-full
                  transition-all transform hover:scale-105
                  ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-amber-600'}
                `}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-black border-t-transparent rounded-full inline-block"
                    />
                    Preparing Reading...
                  </span>
                ) : (
                  'Begin Reading'
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}