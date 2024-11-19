// src/components/ErrorBoundary.tsx
import React from 'react';

export class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-serif text-white mb-4">
            Something went wrong
          </h2>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-amber-500 text-black rounded-full"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}