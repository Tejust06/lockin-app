import React from 'react';

export function PageLoader(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-screen bg-lockin-bg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-lockin-accent mx-auto mb-4"></div>
        <p className="text-lockin-secondary">Loading...</p>
      </div>
    </div>
  );
}
