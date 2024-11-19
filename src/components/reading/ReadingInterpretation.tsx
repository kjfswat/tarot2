import React, { useState, Suspense } from 'react';
import { Card as CardType, Spread } from '../../types/tarot';
import { AstrologicalData, UserProfile } from '../../types/user';
import { useInView } from 'react-intersection-observer';
import { InterpretationHeader } from './InterpretationHeader';
import { CardInterpretation } from './CardInterpretation';
import { SpreadMap } from './SpreadMap';
import { ReadingShare } from '../ReadingShare';
import { AstrologicalSection } from './AstrologicalSection';
import { generateCardInterpretation } from '../../utils/interpretationGenerator';

// Lazy-loaded components
const CardCombinationInsights = React.lazy(() => import('../CardCombinationInsights'));
const ReadingHistory = React.lazy(() => import('../history/ReadingHistoryPage'));

interface ReadingInterpretationProps {
  spread: Spread;
  selectedCards: Array<{ card: CardType; position: number; isReversed: boolean }>;
  astrologicalData?: AstrologicalData;
  userProfile?: UserProfile;
}

export function ReadingInterpretation({
  spread,
  selectedCards,
  astrologicalData,
  userProfile
}: ReadingInterpretationProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'basic' | 'detailed'>('basic');
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const textSizeClass = textSize === 'large' ? 'text-lg' : 'text-base';

  return (
    <div 
      className={`max-w-7xl mx-auto px-4 py-8 ${highContrast ? 'bg-black text-white' : ''}`}
      ref={ref}
    >
      <InterpretationHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        showAccessibility={showAccessibility}
        setShowAccessibility={setShowAccessibility}
        textSize={textSize}
        setTextSize={setTextSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <SpreadMap spread={spread} selectedCards={selectedCards} />
          
          {astrologicalData && (
            <AstrologicalSection
              data={astrologicalData}
              highContrast={highContrast}
            />
          )}
        </div>

        <div className="space-y-6">
          {selectedCards.map(({ card, position, isReversed }, index) => (
            <CardInterpretation
              key={`${card.id}-${position}`}
              card={card}
              position={position}
              isReversed={isReversed}
              positionName={spread.positions[position].name}
              interpretation={generateCardInterpretation(
                card,
                position,
                isReversed,
                spread,
                astrologicalData,
                userProfile
              )}
              isExpanded={expandedCard === index}
              onToggleExpand={() => setExpandedCard(expandedCard === index ? null : index)}
              textSizeClass={textSizeClass}
              highContrast={highContrast}
              inView={inView}
              index={index}
            />
          ))}
        </div>
      </div>

      {viewMode === 'detailed' && (
        <Suspense fallback={<div className="h-48 animate-pulse bg-purple-800/30 rounded-xl mt-6" />}>
          <CardCombinationInsights
            combinations={selectedCards.map(({ card }) => card)}
            astrologicalData={astrologicalData}
            highContrast={highContrast}
          />
        </Suspense>
      )}

      {userProfile && viewMode === 'detailed' && (
        <Suspense fallback={<div className="h-48 animate-pulse bg-purple-800/30 rounded-xl mt-6" />}>
          <ReadingHistory
            userProfile={userProfile}
            currentSpread={spread}
            highContrast={highContrast}
          />
        </Suspense>
      )}

      <div className="mt-8 flex justify-end">
        <ReadingShare
          spreadRef={null}
          reading={{
            spread: spread.name,
            cards: selectedCards.map(({ card, position }) => ({
              name: card.name,
              position: spread.positions[position].name
            })),
            interpretation: selectedCards.map(({ card, position, isReversed }) => 
              generateCardInterpretation(
                card,
                position,
                isReversed,
                spread,
                astrologicalData,
                userProfile
              )
            ).join(' ')
          }}
        />
      </div>
    </div>
  );
}