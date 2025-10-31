'use client';

import { useState } from 'react';
import { Scene3D, DimensionCard } from '@/components/three';
import type { CubeFaceInfo } from '@/components/three/types';

export default function Transformation3DPage() {
  const [selectedFace, setSelectedFace] = useState<CubeFaceInfo | null>(null);
  const [showHelpers, setShowHelpers] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleFaceClick = (faceInfo: CubeFaceInfo) => {
    setSelectedFace(faceInfo);
    setShowWelcome(false);
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
        className="transition-all duration-500"
      />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent p-6 backdrop-blur-sm pointer-events-none">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-green-400 to-orange-400">
            Personal Transformation Model
          </h1>
          <p className="text-gray-300 text-sm max-w-2xl">
            Explore the three-dimensional framework for personal growth through
            temporal awareness, depth of consciousness, and relational intelligence
          </p>
        </div>
      </header>

      {/* Control Panel */}
      <aside className="absolute top-32 left-6 bg-black/60 backdrop-blur-md text-white p-5 rounded-xl border border-white/10 shadow-2xl max-w-xs space-y-4">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          Controls
        </h2>

        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
              Grid & Axes
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={showHelpers}
                onChange={(e) => setShowHelpers(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </div>
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
              Auto Rotate
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={autoRotate}
                onChange={(e) => setAutoRotate(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </div>
          </label>
        </div>

        {selectedFace && (
          <button
            onClick={() => {
              setSelectedFace(null);
              setShowWelcome(true);
            }}
            className="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-indigo-500/50"
          >
            Clear Selection
          </button>
        )}

        <div className="pt-4 mt-4 border-t border-white/10">
          <p className="text-xs text-gray-400 leading-relaxed">
            Use arrow keys to rotate, mouse to orbit, and click faces for details
          </p>
        </div>
      </aside>

      {/* Dimension Card */}
      <DimensionCard
        faceInfo={selectedFace}
        onClose={() => {
          setSelectedFace(null);
          setShowWelcome(true);
        }}
        position="right"
      />

      {/* Welcome Message */}
      {showWelcome && !selectedFace && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-orange-900/80 backdrop-blur-md text-white px-8 py-6 rounded-2xl border border-white/20 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-indigo-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Begin Your Transformation Journey</h3>
                <p className="text-sm text-gray-200 leading-relaxed mb-3">
                  Each face of the cube represents a unique dimension of personal growth.
                  Click on any face to discover transformative practices and insights.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-500/30 rounded-full text-xs">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                    Temporal
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/30 rounded-full text-xs">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    Depth
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500/30 rounded-full text-xs">
                    <div className="w-2 h-2 bg-orange-400 rounded-full" />
                    Relational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accessibility Instructions */}
      <div className="sr-only" role="region" aria-label="Page instructions">
        <h2>Personal Transformation 3D Model</h2>
        <p>
          This page contains an interactive 3D cube representing three dimensions of personal
          transformation: Temporal, Depth, and Relational. Use your mouse to orbit the camera,
          scroll to zoom, and click on cube faces to learn more about each dimension.
          Keyboard users can use arrow keys to rotate the cube.
        </p>
      </div>
    </main>
  );
}
