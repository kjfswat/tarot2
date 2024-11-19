import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../../types/user';
import { CustomDeck } from '../../types/deck';
import { getDeckById } from '../../utils/deckStorage';
import { Clock, Calendar, Search, ChevronDown } from 'lucide-react';

interface ReadingRecord {
  date: string;
  spread: string;
  cards: Array<{
    name: string;
    isCustom: boolean;
    deckId?: string;
  }>;
  interpretation: string;
}

interface ReadingHistoryPageProps {
  userProfile?: UserProfile;
}

export function ReadingHistoryPage({ userProfile }: ReadingHistoryPageProps) {
  const [readings, setReadings] = useState<ReadingRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedReading, setExpandedReading] = useState<number | null>(null);
  const [decks, setDecks] = useState<Record<string, CustomDeck>>({});

  useEffect(() => {
    const storedReadings = JSON.parse(localStorage.getItem('readingHistory') || '[]');
    setReadings(storedReadings);

    // Load all custom decks referenced in readings
    const deckIds = new Set(
      storedReadings
        .flatMap(r => r.cards)
        .filter(c => c.deckId)
        .map(c => c.deckId)
    );

    const loadedDecks: Record<string, CustomDeck> = {};
    deckIds.forEach(id => {
      const deck = getDeckById(id!);
      if (deck) {
        loadedDecks[id] = deck;
      }
    });
    setDecks(loadedDecks);
  }, []);

  const filteredReadings = readings.filter(reading =>
    reading.spread.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reading.cards.some(card => card.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    reading.interpretation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCardDisplay = (card: { name: string; isCustom: boolean; deckId?: string }) => {
    if (card.isCustom && card.deckId && decks[card.deckId]) {
      return `${card.name} (${decks[card.deckId].name})`;
    }
    return card.name;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-serif text-white mb-4 flex items-center gap-3">
            <Clock className="w-8 h-8 text-amber-400" />
            Your Reading History
          </h1>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input
              type="text"
              placeholder="Search your readings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-purple-800/30 rounded-lg pl-10 pr-4 py-2 text-purple-100 placeholder-purple-400 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>
        </header>

        <div className="space-y-4">
          {filteredReadings.map((reading, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-purple-900/40 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(reading.date).toLocaleDateString()}
                  </div>
                  <h3 className="text-xl font-serif text-white mb-2">
                    {reading.spread}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {reading.cards.map((card, cardIndex) => (
                      <span
                        key={cardIndex}
                        className={`
                          text-sm px-3 py-1 rounded-full
                          ${card.isCustom
                            ? 'bg-amber-500/20 text-amber-200'
                            : 'bg-purple-800/50 text-purple-200'}
                        `}
                      >
                        {getCardDisplay(card)}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setExpandedReading(expandedReading === index ? null : index)}
                  className="p-2 rounded-full hover:bg-purple-800/50 transition-colors"
                >
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 transform transition-transform ${
                      expandedReading === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {expandedReading === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-purple-800"
                >
                  <p className="text-purple-200">
                    {reading.interpretation}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}

          {filteredReadings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-purple-200">
                {searchTerm
                  ? 'No readings match your search'
                  : 'No readings recorded yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}