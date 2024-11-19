import React from 'react';
import { Moon, Stars } from 'lucide-react';

export function CardBack() {
  return (
    <div className="w-full h-full rounded-lg bg-indigo-900 border-2 border-amber-500/20">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <Moon className="w-8 h-8 text-amber-400" />
        <div className="flex gap-2">
          <Stars className="w-6 h-6 text-amber-400/60" />
          <Stars className="w-6 h-6 text-amber-400/80" />
          <Stars className="w-6 h-6 text-amber-400" />
        </div>
      </div>
    </div>
  );
}