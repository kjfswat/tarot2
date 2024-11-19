import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomDeck } from '../../types/deck';
import { getAllDecks, deleteDeck, setActiveDeck, getActiveDeck } from '../../utils/deckStorage';
import { CustomDeckCreator } from './CustomDeckCreator';
import { Library, Plus, Trash2, Edit2, Star, Share2, AlertCircle } from 'lucide-react';

export function DeckManagementPage() {
  const [decks, setDecks] = useState<CustomDeck[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingDeck, setEditingDeck] = useState<CustomDeck | null>(null);
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadDecks();
    const activeDeck = getActiveDeck();
    if (activeDeck) {
      setActiveDeckId(activeDeck.id);
    }
  }, []);

  const loadDecks = () => {
    try {
      const loadedDecks = getAllDecks();
      setDecks(loadedDecks);
    } catch (err) {
      setError('Failed to load decks');
    }
  };

  const handleDeleteDeck = (deckId: string) => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      try {
        deleteDeck(deckId);
        loadDecks();
        setError('');
      } catch (err) {
        setError('Failed to delete deck');
      }
    }
  };

  const handleSetActive = (deck: CustomDeck) => {
    try {
      setActiveDeck(deck);
      setActiveDeckId(deck.id);
      setError('');
    } catch (err) {
      setError('Failed to set active deck');
    }
  };

  const handleShare = async (deck: CustomDeck) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(deck));
      alert('Deck data copied to clipboard');
    } catch (err) {
      setError('Failed to share deck');
    }
  };

  if (isCreating || editingDeck) {
    return (
      <CustomDeckCreator
        initialDeck={editingDeck}
        onSave={(deck) => {
          loadDecks();
          setIsCreating(false);
          setEditingDeck(null);
        }}
        onCancel={() => {
          setIsCreating(false);
          setEditingDeck(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-white flex items-center gap-3">
            <Library className="w-8 h-8 text-amber-400" />
            Your Tarot Decks
          </h1>
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-amber-500 text-purple-900 rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Deck
          </button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-500/20 text-red-200 rounded-lg flex items-center gap-2"
            >
              <AlertCircle className="w-5 h-5" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map(deck => (
            <motion.div
              key={deck.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                bg-purple-900/40 backdrop-blur-sm rounded-xl p-6
                ${activeDeckId === deck.id ? 'ring-2 ring-amber-400' : ''}
              `}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-serif text-white mb-1">{deck.name}</h3>
                  <p className="text-sm text-purple-200">{deck.cards.length} cards</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSetActive(deck)}
                    className={`
                      p-2 rounded-lg transition-colors
                      ${activeDeckId === deck.id
                        ? 'bg-amber-500 text-purple-900'
                        : 'text-amber-400 hover:bg-purple-800/50'}
                    `}
                    aria-label={activeDeckId === deck.id ? 'Active deck' : 'Set as active deck'}
                  >
                    <Star className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare(deck)}
                    className="p-2 text-purple-200 hover:bg-purple-800/50 rounded-lg transition-colors"
                    aria-label="Share deck"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setEditingDeck(deck)}
                    className="p-2 text-purple-200 hover:bg-purple-800/50 rounded-lg transition-colors"
                    aria-label="Edit deck"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteDeck(deck.id)}
                    className="p-2 text-purple-200 hover:bg-purple-800/50 rounded-lg transition-colors"
                    aria-label="Delete deck"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <p className="text-purple-200 mb-4">{deck.description}</p>

              <div className="grid grid-cols-4 gap-2">
                {deck.cards.slice(0, 4).map(card => (
                  <div
                    key={card.id}
                    className="aspect-[2/3] rounded-lg overflow-hidden bg-purple-800/30"
                  >
                    {card.image && (
                      <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>

              {deck.cards.length > 4 && (
                <p className="text-sm text-purple-300 mt-2">
                  +{deck.cards.length - 4} more cards
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {decks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-purple-200">
              You haven't created any decks yet. Click "Create New Deck" to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}