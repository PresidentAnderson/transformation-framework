'use client';

import { useState } from 'react';
import Scene3D from '@/components/three/Scene3D';
import type { CubeFaceInfo } from '@/components/three/types';

export default function CubeDemoPage() {
  const [selectedFace, setSelectedFace] = useState<CubeFaceInfo | null>(null);
  const [showHelpers, setShowHelpers] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);

  const handleFaceClick = (faceInfo: CubeFaceInfo) => {
    setSelectedFace(faceInfo);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-slate-950">
      {/* 3D Scene */}
      <Scene3D
        showHelpers={showHelpers}
        autoRotate={autoRotate}
        enableOrbitControls={true}
        showStars={true}
        onFaceClick={handleFaceClick}
      />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-6 pointer-events-none">
        <h1 className="text-3xl font-bold text-white mb-2">
          Personal Transformation Model
        </h1>
        <p className="text-gray-300 text-sm">
          Interactive 3D cube representing temporal, depth, and relational dimensions
        </p>
      </div>

      {/* Controls Panel */}
      <div className="absolute top-24 left-4 bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg space-y-3 max-w-xs">
        <h2 className="font-bold text-lg mb-3">Settings</h2>

        <div className="flex items-center justify-between">
          <label htmlFor="helpers" className="text-sm cursor-pointer">
            Show Helpers
          </label>
          <input
            id="helpers"
            type="checkbox"
            checked={showHelpers}
            onChange={(e) => setShowHelpers(e.target.checked)}
            className="w-4 h-4 cursor-pointer accent-indigo-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="autoRotate" className="text-sm cursor-pointer">
            Auto Rotate
          </label>
          <input
            id="autoRotate"
            type="checkbox"
            checked={autoRotate}
            onChange={(e) => setAutoRotate(e.target.checked)}
            className="w-4 h-4 cursor-pointer accent-indigo-500"
          />
        </div>

        {selectedFace && (
          <button
            onClick={() => setSelectedFace(null)}
            className="w-full mt-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-sm transition-colors"
          >
            Clear Selection
          </button>
        )}
      </div>

      {/* Face Details Panel */}
      {selectedFace && (
        <div className="absolute top-24 right-4 bg-black/90 backdrop-blur-sm text-white p-6 rounded-lg shadow-2xl max-w-md animate-in slide-in-from-right">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">{selectedFace.name}</h2>
              <div
                className="inline-block px-2 py-1 rounded text-xs font-semibold"
                style={{ backgroundColor: selectedFace.color + '40', color: selectedFace.color }}
              >
                {selectedFace.dimension} Dimension
              </div>
            </div>
            <button
              onClick={() => setSelectedFace(null)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <p className="text-gray-300 mb-4 leading-relaxed">
            {selectedFace.description}
          </p>

          <div>
            <h3 className="font-semibold text-lg mb-3 text-indigo-300">
              Transformative Practices
            </h3>
            <ul className="space-y-2">
              {selectedFace.practices.map((practice, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-300"
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: selectedFace.color }}
                  />
                  <span>{practice}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-400">
              Click on different cube faces to explore other dimensions of transformation
            </p>
          </div>
        </div>
      )}

      {/* Instructions Panel - Show only when no face is selected */}
      {!selectedFace && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm text-white px-6 py-4 rounded-lg max-w-2xl">
          <p className="text-center text-sm">
            <span className="font-semibold text-indigo-300">Click on any cube face</span> to explore
            the transformative practices of each dimension
          </p>
        </div>
      )}
    </main>
  );
}
