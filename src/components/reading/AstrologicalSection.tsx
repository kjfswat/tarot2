import React, { Suspense } from 'react';
import { AstrologicalData } from '../../types/user';

const AstrologicalChart = React.lazy(() => import('../AstrologicalChart'));

interface AstrologicalSectionProps {
  data: AstrologicalData;
  highContrast: boolean;
}

export function AstrologicalSection({ data, highContrast }: AstrologicalSectionProps) {
  const contrastClass = highContrast ? 'bg-black text-white' : 'bg-purple-900/40';

  return (
    <Suspense fallback={<div className="h-96 animate-pulse bg-purple-800/30 rounded-xl" />}>
      <div className={`${contrastClass} backdrop-blur-sm rounded-xl p-6`}>
        <h3 className={`text-xl font-serif ${highContrast ? 'text-white' : 'text-white'} mb-4`}>
          Astrological Influences
        </h3>
        <AstrologicalChart data={data} />
      </div>
    </Suspense>
  );
}