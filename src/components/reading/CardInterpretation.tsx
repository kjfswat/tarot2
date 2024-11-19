import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Card as CardType } from '../../types/tarot';
import { CardMeaning } from './CardMeaning';

interface CardInterpretationProps {
  card: CardType;
  position: number;
  isReversed: boolean;
  positionName: string;
  interpretation: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  textSizeClass: string;
  highContrast: boolean;
  inView: boolean;
  index: number;
}

export function CardInterpretation({
  card,
  position,
  isReversed,
  positionName,
  interpretation,
  isExpanded,
  onToggleExpand,
  textSizeClass,
  highContrast,
  inView,
  index
}: CardInterpretationProps) {
  const contrastClass = highContrast ? 'bg-black text-white' : 'bg-purple-900/40';

  return (
    <motion.div
      initial={inView ? { opacity: 0, y: 20 } : false}
      animate={inView ? { opacity: 1, y: 0 } : false}
      transition={{ delay: index * 0.1 }}
      className={`${contrastClass} backdrop-blur-sm rounded-xl p-6 transition-all`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className={`text-xl font-serif ${highContrast ? 'text-white' : 'text-white'} mb-1`}>
            {positionName}
          </h3>
          <p className={`${highContrast ? 'text-gray-300' : 'text-amber-400'} text-sm mb-2`}>
            {card.name} {isReversed ? '(Reversed)' : ''}
          </p>
        </div>
        <button
          onClick={onToggleExpand}
          className={`p-2 rounded-full ${highContrast ? 'hover:bg-gray-800' : 'hover:bg-purple-800/50'} transition-colors`}
          aria-label={isExpanded ? 'Collapse card details' : 'Expand card details'}
        >
          <ChevronDown
            className={`w-5 h-5 ${highContrast ? 'text-white' : 'text-amber-400'} transform transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <p className={`${textSizeClass} ${highContrast ? 'text-gray-300' : 'text-purple-200'} mb-4`}>
        {interpretation}
      </p>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <CardMeaning
              card={card}
              isReversed={isReversed}
              highContrast={highContrast}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}