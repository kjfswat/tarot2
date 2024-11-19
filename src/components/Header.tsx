import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Library, History } from 'lucide-react';

export function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-purple-900/90 to-indigo-900/90 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Moon className="w-8 h-8 text-amber-300" />
            <h1 className="text-2xl font-serif text-white">Mystic Tarot</h1>
          </Link>
<nav className="flex items-center space-x-4">
  <Link 
    to="/decks" 
    className="text-purple-200 hover:text-white transition-colors duration-200 border-none"
  >
    Manage Decks
  </Link>
  <Link 
    to="/decks/browse" 
    className="text-purple-200 hover:text-white transition-colors duration-200 border-none"
  >
    Decks
  </Link>
</nav>
        </div>
      </div>
    </header>
  );
}