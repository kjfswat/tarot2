import React from 'react';
import { motion } from 'framer-motion';
import { Card as CardType } from '../types/tarot';
import { CardBack } from './CardBack';

interface CardProps {
  card: CardType;
  isRevealed: boolean;
  position?: number;
  onReveal?: () => void;
  isReversed?: boolean;
}

export function Card({ 
  card, 
  isRevealed, 
  position, 
  onReveal,
  isReversed = false 
}: CardProps) {
  return (
    <div className="perspective-1000">
      <motion.div
        className={`
          relative w-32 h-48 rounded-xl overflow-hidden
          preserve-3d cursor-pointer
          ${position !== undefined ? `absolute translate-x-[${position * 100}%]` : ''}
        `}
        initial={false}
        animate={{
          rotateY: isRevealed ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        onClick={onReveal}
      >
        {/* Front of card (initially visible - CardBack) */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            transform: 'rotateY(0deg)',
            zIndex: isRevealed ? 0 : 1
          }}
        >
          <CardBack />
        </div>

        {/* Back of card (initially hidden - Card Image) */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            transform: 'rotateY(180deg)',
            zIndex: isRevealed ? 1 : 0
          }}
        >
          <div 
            className="relative w-full h-full bg-purple-900 rounded-xl overflow-hidden"
            style={{
              transform: isReversed ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            {card.image ? (
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover"
                style={{
                  backfaceVisibility: 'hidden'
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-indigo-900 text-amber-400">
                <span className="text-lg font-serif">{card.name}</span>
              </div>
            )}

            {/* Card Name Overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              style={{
                transform: isReversed ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            >
              <div 
                className="absolute bottom-0 left-0 right-0 p-3 text-white"
                style={{
                  transform: isReversed ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              >
                <h3 className="text-sm font-serif font-semibold">{card.name}</h3>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Card;