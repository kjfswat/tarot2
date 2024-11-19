import React from 'react';
import { Reader } from '../types/tarot';
import { readers } from '../data/readers';
import { Star, Heart, Brain, Sparkles } from 'lucide-react';

interface ReaderSelectionProps {
  selectedReader: Reader | null;
  onSelectReader: (reader: Reader) => void;
}

export function ReaderSelection({ selectedReader, onSelectReader }: ReaderSelectionProps) {
  const getReaderIcon = (style: string) => {
    switch (style) {
      case 'nurturing': return Heart;
      case 'analytical': return Brain;
      case 'mystical': return Sparkles;
      case 'direct': return Star;
      default: return Star;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
      {readers.map((reader) => {
        const Icon = getReaderIcon(reader.style);
        const isSelected = selectedReader?.id === reader.id;

        return (
          <button
            key={reader.id}
            onClick={() => onSelectReader(reader)}
            className={`
              relative group p-6 rounded-xl text-left transition-all duration-300
              ${isSelected 
                ? 'bg-purple-800/80 scale-105 ring-2 ring-amber-400' 
                : 'bg-purple-900/40 hover:bg-purple-800/60 hover:scale-102'}
            `}
          >
            <div className="relative mb-4">
              <img
                src={reader.avatar}
                alt={reader.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-2 ring-amber-400/50"
              />
              <div className="absolute -bottom-2 right-1/2 transform translate-x-1/2">
                <Icon className="w-6 h-6 text-amber-400" />
              </div>
            </div>

            <h3 className="text-xl font-serif text-white text-center mb-1">
              {reader.name}
            </h3>
            <p className="text-amber-400 text-sm text-center mb-4">
              {reader.title}
            </p>

            <p className="text-purple-200 text-sm mb-4">
              {reader.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {reader.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded-full bg-purple-800/50 text-purple-200"
                >
                  {specialty}
                </span>
              ))}
            </div>

            {isSelected && (
              <div className="absolute inset-0 ring-2 ring-amber-400 rounded-xl pointer-events-none" />
            )}
          </button>
        );
      })}
    </div>
  );
}