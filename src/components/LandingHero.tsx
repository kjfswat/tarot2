import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Library } from 'lucide-react';

export function LandingHero() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-900 text-white px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="flex justify-center">
          <Sparkles className="w-16 h-16 text-amber-300" />
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold">
          Discover Your Path
        </h1>
        <p className="text-xl md:text-2xl text-purple-200">
          Unlock the ancient wisdom of tarot through our intuitive digital readings
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/reading')}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-full transition-colors"
          >
            Get Reading
          </button>
          <button
            onClick={() => navigate('/decks')}
            className="px-8 py-3 border-2 border-purple-400 hover:border-amber-300 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            <Library className="w-5 h-5" />
            Manage Decks
          </button>
        </div>
      </div>
    </div>
  );
}