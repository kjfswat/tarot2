import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { LandingHero } from './components/LandingHero';
import { SpreadSelection } from './components/SpreadSelection';
import { DeckManagementPage } from './components/deck/DeckManagementPage';
import { TarotReadingPage } from './components/reading/TarotReadingPage';
import { ReadingHistoryPage } from './components/history/ReadingHistoryPage';
import { DailyCard } from './components/DailyCard';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  const [showDailyCard, setShowDailyCard] = useState(true);

  // Check if user has a reading in progress
  const hasActiveReading = sessionStorage.getItem('selectedSpread');

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              {showDailyCard && (
                <div className="mb-8">
                  <DailyCard onClose={() => setShowDailyCard(false)} />
                </div>
              )}
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <div className="space-y-12">
                      <LandingHero />
                      {!hasActiveReading && <SpreadSelection />}
                      {hasActiveReading && (
                        <div className="text-center">
                          <p className="text-purple-200 mb-4">
                            You have a reading in progress
                          </p>
                          <button
                            onClick={() => {
                              sessionStorage.removeItem('selectedSpread');
                              window.location.reload();
                            }}
                            className="text-amber-400 hover:text-amber-300 underline"
                          >
                            Start a new reading
                          </button>
                        </div>
                      )}
                    </div>
                  } 
                />
                <Route 
                  path="/decks/*" 
                  element={
                    <Routes>
                      <Route path="/" element={<DeckManagementPage />} />
                      <Route path="browse" element={<DeckManagementPage mode="browse" />} />
                    </Routes>
                  } 
                />
                <Route 
                  path="/reading" 
                  element={
                    hasActiveReading ? (
                      <TarotReadingPage />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  } 
                />
                <Route path="/history" element={<ReadingHistoryPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;