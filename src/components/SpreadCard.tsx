import React from 'react';
import type { Spread } from '../types/tarot';
import { LucideIcon } from 'lucide-react';

interface SpreadCardProps {
  spread: Spread;
  isSelected: boolean;
  onSelect: () => void;
  Icon: LucideIcon;
}

export function SpreadCard({ spread, isSelected, onSelect, Icon }: SpreadCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full p-6 rounded-2xl text-left transition-all duration-300 transform
        ${isSelected 
          ? 'bg-purple-800/80 scale-105 ring-2 ring-amber-400' 
          : 'bg-purple-900/40 hover:bg-purple-800/60 hover:scale-102'}
        backdrop-blur-sm group
      `}
    >
      <div className="flex items-start space-x-4">
        <div className={`
          p-3 rounded-lg transition-colors duration-300
          ${isSelected ? 'bg-amber-400 text-purple-900' : 'bg-purple-800 text-amber-400 group-hover:bg-amber-400/20'}
        `}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-serif font-semibold text-white mb-2">
            {spread.name}
          </h3>
          <p className="text-purple-200 text-sm mb-4">
            {spread.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {spread.positions.slice(0, 3).map((position) => (
              <span
                key={position.id}
                className="text-xs px-2 py-1 rounded-full bg-purple-800/50 text-purple-200"
              >
                {position.name}
              </span>
            ))}
            {spread.positions.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-full bg-purple-800/50 text-purple-200">
                +{spread.positions.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}