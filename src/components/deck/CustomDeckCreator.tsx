import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomDeck, CustomCard, DeckTemplate } from '../../types/deck';
import { deckTemplates } from '../../data/deckTemplates';
import { saveCustomDeck, validateImage } from '../../utils/deckStorage';
import { Upload, Plus, Save, Layout, AlertCircle } from 'lucide-react';

interface CustomDeckCreatorProps {
  initialDeck?: CustomDeck;
  onSave: (deck: CustomDeck) => void;
  onCancel: () => void;
}

export function CustomDeckCreator({ initialDeck, onSave, onCancel }: CustomDeckCreatorProps) {
  const [deck, setDeck] = useState<CustomDeck>(initialDeck || {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    cards: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: false,
    author: 'User',
    isPublic: false
  });

  const [selectedTemplate, setSelectedTemplate] = useState<DeckTemplate | null>(null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File, cardIndex: number) => {
    try {
      const imageData = await validateImage(file);
      const updatedCards = [...deck.cards];
      updatedCards[cardIndex] = {
        ...updatedCards[cardIndex],
        image: imageData
      };
      setDeck({ ...deck, cards: updatedCards });
      setError('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleTemplateSelect = (template: DeckTemplate) => {
    setSelectedTemplate(template);
    setDeck({
      ...deck,
      templateId: template.id,
      cards: template.cardTemplates.map(ct => ({
        id: crypto.randomUUID(),
        name: ct.name,
        image: ct.defaultImage,
        description: ct.description,
        meaningUpright: '',
        meaningReversed: '',
        isCustom: true,
        templateId: template.id
      }))
    });
  };

  const handleSave = () => {
    if (!deck.name.trim()) {
      setError('Deck name is required');
      return;
    }
    if (deck.cards.length === 0) {
      setError('Deck must contain at least one card');
      return;
    }
    
    try {
      saveCustomDeck(deck);
      onSave(deck);
      setError('');
    } catch (err) {
      setError('Failed to save deck');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-purple-900/40 backdrop-blur-sm rounded-xl p-6">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-white mb-4">
              {initialDeck ? 'Edit Deck' : 'Create New Deck'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={deck.name}
                onChange={(e) => setDeck({ ...deck, name: e.target.value })}
                placeholder="Deck Name"
                className="bg-purple-800/30 rounded-lg px-4 py-2 text-purple-100 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
              <input
                type="text"
                value={deck.description}
                onChange={(e) => setDeck({ ...deck, description: e.target.value })}
                placeholder="Deck Description"
                className="bg-purple-800/30 rounded-lg px-4 py-2 text-purple-100 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Template Selection */}
          {!initialDeck && (
            <div className="mb-8">
              <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-2">
                <Layout className="w-5 h-5 text-amber-400" />
                Choose a Template
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {deckTemplates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className={`
                      p-4 rounded-lg text-left transition-all
                      ${selectedTemplate?.id === template.id
                        ? 'bg-amber-500 text-purple-900' 
                        : 'bg-purple-800/30 text-purple-100 hover:bg-purple-700/40'}
                    `}
                  >
                    <h4 className="font-serif font-semibold mb-2">{template.name}</h4>
                    <p className="text-sm opacity-80">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {deck.cards.map((card, index) => (
              <div
                key={card.id}
                className="bg-purple-800/30 rounded-lg p-4 space-y-2"
              >
                <div
                  className="aspect-[2/3] rounded-lg overflow-hidden bg-purple-700/30 mb-2 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-purple-400" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, index);
                  }}
                />
                <input
                  type="text"
                  value={card.name}
                  onChange={(e) => {
                    const updatedCards = [...deck.cards];
                    updatedCards[index] = { ...card, name: e.target.value };
                    setDeck({ ...deck, cards: updatedCards });
                  }}
                  placeholder="Card Name"
                  className="w-full bg-purple-700/30 rounded px-2 py-1 text-sm text-purple-100"
                />
              </div>
            ))}

            {/* Add Card Button */}
            <button
              onClick={() => {
                setDeck({
                  ...deck,
                  cards: [...deck.cards, {
                    id: crypto.randomUUID(),
                    name: '',
                    image: '',
                    description: '',
                    meaningUpright: '',
                    meaningReversed: '',
                    isCustom: true
                  }]
                });
              }}
              className="aspect-[2/3] rounded-lg border-2 border-dashed border-purple-600 flex items-center justify-center text-purple-400 hover:text-purple-300 hover:border-purple-500 transition-colors"
            >
              <Plus className="w-8 h-8" />
            </button>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 p-3 bg-red-500/20 text-red-200 rounded-lg flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={onCancel}
              className="px-6 py-2 rounded-lg text-purple-200 hover:bg-purple-800/30 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-amber-500 text-purple-900 rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Deck
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}