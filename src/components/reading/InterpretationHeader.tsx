import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Maximize2, Settings } from 'lucide-react';

interface InterpretationHeaderProps {
  viewMode: 'basic' | 'detailed';
  setViewMode: (mode: 'basic' | 'detailed') => void;
  showAccessibility: boolean;
  setShowAccessibility: (show: boolean) => void;
  textSize: 'normal' | 'large';
  setTextSize: (size: 'normal' | 'large') => void;
  highContrast: boolean;
  setHighContrast: (contrast: boolean) => void;
}

export function InterpretationHeader({
  viewMode,
  setViewMode,
  showAccessibility,
  setShowAccessibility,
  textSize,
  setTextSize,
  highContrast,
  setHighContrast
}: InterpretationHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 text-center"
    >
      <h2 className={`text-3xl font-serif ${highContrast ? 'text-white' : 'text-white'} mb-4`}>
        Your Reading
      </h2>
      
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setViewMode('basic')}
          className={`
            px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2
            ${viewMode === 'basic' 
              ? 'bg-amber-500 text-purple-900' 
              : `${highContrast ? 'text-white border-white' : 'text-amber-400 border-amber-400/30'} border`}
          `}
          aria-label="Switch to basic view"
        >
          <Eye className="w-4 h-4" />
          Basic
        </button>
        <button
          onClick={() => setViewMode('detailed')}
          className={`
            px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2
            ${viewMode === 'detailed' 
              ? 'bg-amber-500 text-purple-900' 
              : `${highContrast ? 'text-white border-white' : 'text-amber-400 border-amber-400/30'} border`}
          `}
          aria-label="Switch to detailed view"
        >
          <Maximize2 className="w-4 h-4" />
          Detailed
        </button>
        
        <button
          onClick={() => setShowAccessibility(!showAccessibility)}
          className={`
            p-2 rounded-full transition-colors
            ${highContrast ? 'bg-white text-black' : 'bg-purple-800/50 text-amber-400'}
          `}
          aria-label="Accessibility options"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {showAccessibility && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex justify-center gap-4 mb-4"
          >
            <button
              onClick={() => setTextSize(size => size === 'normal' ? 'large' : 'normal')}
              className="px-4 py-2 rounded-full border border-amber-400/30 text-amber-400"
            >
              {textSize === 'normal' ? 'Larger Text' : 'Normal Text'}
            </button>
            <button
              onClick={() => setHighContrast(hc => !hc)}
              className="px-4 py-2 rounded-full border border-amber-400/30 text-amber-400"
            >
              {highContrast ? 'Normal Contrast' : 'High Contrast'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}